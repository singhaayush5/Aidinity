import { useContext, useEffect, useState } from "react";
import { Divider, Typography } from "@mui/material";
import UserContext from "../../context/user/usercontext";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import "./dashboard.css";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";

const UserProfile = () => {
  const [usr,setUsr] = useState({});
  const authUser = useContext(UserContext);

  useEffect(() => {
    axios
    .get(`${BASE_URL}/checkuser`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      setUsr(res.data);
    });

    document.title = "User Profile | Aidinity";
  }, []);

  return (
    <>
      {" "}
      <Navbar />{" "}
      {usr._id ? (
        <div
          style={{
            width: "100%",
            minHeight: "92vh",
            marginTop: "8vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <Typography
            sx={{ fontWeight: 500, textAlign: "center", color: "#FDC9FF" }}
            variant="h3"
          >
            User Profile Details
          </Typography>
          <Typography
            sx={{ fontWeight: 400, textAlign: "center", color: "#999" }}
            variant="h6"
          >
            All details are immutable.
          </Typography>
          <Divider color="#dadada" sx={{ margin: "1% 0%", width: "75%" }} />

          <table
            style={{
              color: "#F5F5DC",
              width: "70%",
              marginTop: "2vh",
              marginBottom: "3vh",
              boxShadow: "11px 11px #000",
            }}
          >
            <tr>
              <td>
                <Typography sx={{ textAlign: "center", color:"#D1FF8F" }} variant="h6">
                  Name
                </Typography>
              </td>
              <td>
                <Typography sx={{ textAlign: "center" }} variant="h6">
                  {usr.name}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography sx={{ textAlign: "center", color:"#D1FF8F"  }} variant="h6">
                  Age
                </Typography>
              </td>
              <td>
                <Typography sx={{ textAlign: "center" }} variant="h6">
                  {usr.age}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography sx={{ textAlign: "center", color:"#D1FF8F"  }} variant="h6">
                  Gender
                </Typography>
              </td>
              <td>
                <Typography sx={{ textAlign: "center" }} variant="h6">
                  {usr.gender}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography sx={{ textAlign: "center", color:"#D1FF8F"  }} variant="h6">
                  Email ID
                </Typography>
              </td>
              <td>
                <Typography sx={{ textAlign: "center" }} variant="h6">
                  {usr.email}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography sx={{ textAlign: "center", color:"#D1FF8F"  }} variant="h6">
                  No. of fundraisers held
                </Typography>
              </td>
              <td>
                <Typography sx={{ textAlign: "center" }} variant="h6">
                  {usr.campaigns.length}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography sx={{ textAlign: "center", color:"#D1FF8F"  }} variant="h6">
                  No. of expressions published
                </Typography>
              </td>
              <td>
                <Typography sx={{ textAlign: "center" }} variant="h6">
                  {usr.expressions.length}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography sx={{ textAlign: "center", color:"#D1FF8F"  }} variant="h6">
                  No. of donations
                </Typography>
              </td>
              <td>
                <Typography sx={{ textAlign: "center" }} variant="h6">
                  {usr.donations.length}
                </Typography>
              </td>
            </tr>
          </table>
          
        </div>
      ) : (
        <div
          style={{
            minWidth: "100%",
            minHeight: "92vh",
            marginTop: "8vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <Typography sx={{ fontSize: "3vw" }} variant="h3">
            You aren&apos;t logged in.
          </Typography>
        </div>
      )}
      <Footer />
    </>
  );
};

export default UserProfile;