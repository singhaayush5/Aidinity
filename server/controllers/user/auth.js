const User = require("../../database/models/user");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
  try {
    
    const { name, age, gender, email, password } = req.body;

    if(!name || !age || !gender || !email || !password){
        return res.status(400).json({msg : "some or all fields are empty!"});
    }

    const userExists = await User.findOne({ email : email });

    if (userExists) {
      return res.status(400).json({ msg: "User Already Exists! " });
    }

    const newUser = new User({
      name,
      age,
      gender,
      email,
      password,
    });
    console.log(newUser);

    const registered = await newUser.save();
    if (registered) {
      console.log(registered);
      res.status(201).json(registered);
    } else {
      res.status(400).json({ error: "Registration Failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async(req,res) => {
  try{
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
      return res.status(400).json({msg : "Some or all fields empty!"});
    }

    const userExists = await User.findOne({email : email});
    console.log(userExists);
    if(userExists){
      const match = await bcrypt.compare(password, userExists.password);
     
      const token = await userExists.generateAuthToken();
      console.log(token);
  
      res.cookie("jwebtoken",token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: false
      });
      if(!match){
        res.status(410).json({msg : "invalid"});
      }else{
        res.status(201).json({msg: "Success!"});
      }
    }else{
      res.status(401).json({msg: "failure!"});
    }
  }catch(err){
    console.log(err);
    res.status(403).json({error : err});
  }
}