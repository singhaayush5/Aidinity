const User = require("../../database/models/user");
const Camp = require("../../database/models/fundcampaign");

exports.createNewCampaign = async (req, res) => {
  try {
    const { name, age, gender, disease, description, amt, state, city } = req.body;
    if (!name || !age || !gender || !disease || !description || !amt || !state || !city) {
      return res.status(400).json("some fields empty!");
    }
    if (!req.rootUser) {
      return res.status(400).json("you're unauthorized!");
    }

    const newCamp = new Camp({
      title: disease,
      campaignHolder: name,
      age: age,
      gender: gender,
      description: description,
      amountRequested: amt,
      state: state,
      city: city,
      active: true,
    });

    const saved = await newCamp.save();

    if (!saved) {
      return res.status(400).json("couldn't create.");
    }

    const holder = await User.findByIdAndUpdate(req.rootUser._id, {
      $push: { campaigns: { campid: saved._id } },
    });

    if (!holder) {
      return res.status(400).json("couldn't save.");
    }

    res.status(200).json("successfully created the campaign.");
  } catch (err) {
    console.log(err);
  }
};

exports.getAllCampaigns = async (req, res) => {
  try {
    const camps = await Camp.find();
    if (!camps) {
      res.status(200).json({ error: "No fcamps." });
    } else {
      res.send(camps);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findCampaign = async (req,res) => {
  try{
      const cid = req.params.id;
      console.log(cid);

      const cmp = await Camp.findById(cid);

      if(!cmp){
          return res.status(400).json("no camp!");
      }
      res.send(cmp);
  }catch(err){
      console.log(err);
  }
}

exports.confirmPayment = async (req,res) => {
  try{
    const {cid, uid, ordId, amount} = req.body;

    const user = await User.findByIdAndUpdate(uid, {
      $push: {donations: {campId: cid, donationId: ordId, amount: amount}},
    });

    if(!user){
      return res.status(400).json("No such donor!");
    }
    const addDonor = await Camp.findByIdAndUpdate(cid, {
      $push: {donors: {donorId: uid, donorName: user.name, donationId: ordId, amount: amount}}
    });

    if(!addDonor){
      return res.status(400).json("Couldn't add the donor!");
    }

    const increaseDonation = await Camp.findByIdAndUpdate(cid, {
      $inc : {amountRaised: amount}
    });

    if(!increaseDonation){
      return res.status(400).json("Couldn't increase donation!");
    }

    const donatedCamp = await Camp.findById(cid);
    if(!donatedCamp){
      return res.status(400).json("Couldn't find camp!");
    }
    else if(donatedCamp.amountRaised >= donatedCamp.amountRequested){
      const changeActivity = await Camp.findByIdAndUpdate(cid, {
        active: false,
      });
      if(!changeActivity){
        return res.status(400).json("Couldn't update donation activity status!");
      }
    }

   

   

    res.status(200).json("successful donation.");

  }catch(err){
    console.log(err);
  }
}

