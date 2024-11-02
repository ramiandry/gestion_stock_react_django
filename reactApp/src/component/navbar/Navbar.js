import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./navbar.css";
import axios from "axios";

function Navbar({ avatar, username, admin }) {
  const [type, setType] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/admins/all`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setType(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };

    fetchData();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <div className="navbar">
      <AppBar sx={{ bgcolor: "transparent" }} elevation={0} position="relative">
        <Toolbar style={{ justifyContent: "right" }}>
          <Avatar
            alt="rien"
            src={`http://127.0.0.1:8000${avatar}`}
            style={{ width: 24, height: 24, marginRight: "5px" }}
          />
          <Typography variant="h6" color="black">
            {username}
          </Typography>
          <Typography color="black">
            ({type.filter((item) => item.id == admin).map((data) => data.type)})
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
