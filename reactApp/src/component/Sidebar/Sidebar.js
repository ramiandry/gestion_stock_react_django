import { Box, Button, MenuItem, MenuList, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { FaChartLine, FaFile, FaHome, FaList, FaMailchimp, FaPaste, FaPersonBooth, FaPiggyBank, FaProjectDiagram, FaSortDown, FaTasks, FaUser, FaWindowMaximize } from "react-icons/fa";

function Sidebar() {
  let navigate = useNavigate();

  const deconnexion = () => {
    sessionStorage.clear();
    navigate("login");
  };
  return (
    <div>
      <div className="logo">
        <img src="../../img/cem-logo.png" alt="logo" />
      </div>
      <div>
        <MenuList sx={{ color: "#db0909" }}>
          <Link to="/" style={{ textDecorationLine: "none" }}>
            <MenuItem
              style={{
                background:
                  window.location.pathname == "/" ? "#db0909" : "transparent",
                color: window.location.pathname == "/" ? "white" : "#db0909",
              }}
            >
              <FaChartLine size={24}  color={window.location.pathname == "/" ? "white" : "#db0909"}/>
              <Typography fontSize="1.3vw" marginLeft={1} textAlign="center">
                Acceuil
              </Typography>
            </MenuItem>
          </Link>
          <Link
            to="agence/"
            style={{ color: "white", textDecorationLine: "none" }}
          >
            <MenuItem
              style={{
                background:
                  window.location.pathname === "/agence/"
                    ? "#db0909"
                    : "transparent",
                color:
                  window.location.pathname === "/agence/" ? "white" : "#db0909",
              }}
            >
              <FaHome size={24}  color={window.location.pathname == "/agence/" ? "white" : "#db0909"}/>
              <Typography marginLeft={1} fontSize="1.3vw">Agence</Typography>
            </MenuItem>
          </Link>

          <Link to="demande/" style={{ textDecorationLine: "none" }}>
            <MenuItem
              style={{
                background:
                  window.location.pathname === "/demande/"
                    ? "#db0909"
                    : "transparent",
                color:
                  window.location.pathname === "/demande/"
                    ? "white"
                    : "#db0909",
              }}
            >
             <FaTasks size={24}  color={window.location.pathname == "/demande/" ? "white" : "#db0909"}/>

              <Typography marginLeft={1} fontSize="1.3vw" textAlign="center">
                Demande
              </Typography>
            </MenuItem>
          </Link>

          <Link to="article/" style={{ textDecorationLine: "none" }}>
            <MenuItem
              style={{
                background:
                  window.location.pathname === "/article/"
                    ? "#db0909"
                    : "transparent",
                color:
                  window.location.pathname === "/article/" ? "white" : "#db0909",
              }}
            >
              <FaList size={24}  color={window.location.pathname == "/article/" ? "white" : "#db0909"}/>
              <Typography marginLeft={1} fontSize="1.3vw" textAlign="center">
                Article
              </Typography>
            </MenuItem>
          </Link>
          <Link to="dispatch/" style={{ textDecorationLine: "none" }}>
            <MenuItem
              style={{
                background:
                  window.location.pathname === "/dispatch/"
                    ? "#db0909"
                    : "transparent",
                color:
                  window.location.pathname === "/dispatch/"
                    ? "white"
                    : "#db0909",
              }}
            >
             <FaProjectDiagram size={24}  color={window.location.pathname == "/dispatch/" ? "white" : "#db0909"}/>
              <Typography marginLeft={1} fontSize="1.3vw" textAlign="center">
                Dispatch
              </Typography>
            </MenuItem>
          </Link>
          <Link to="fournisseur/" style={{ textDecorationLine: "none" }}>
            <MenuItem
              style={{
                background:
                  window.location.pathname === "/fournisseur/"
                    ? "#db0909"
                    : "transparent",
                color:
                  window.location.pathname === "/fournisseur/"
                    ? "white"
                    : "#db0909",
              }}
            >
             <FaUser size={24}  color={window.location.pathname == "/fournisseur/" ? "white" : "#db0909"}/>
              <Typography marginLeft={1} fontSize="1.3vw" textAlign="center">
                Fournisseur
              </Typography>
            </MenuItem>
          </Link>
        </MenuList>
      </div>
      <Box sx={{ width: "100%", paddingX:2 }} className="logout">
        <Button
          sx={{ width: "90%", borderWidth:2, "& hover":{borderWidth:2}}}
          variant="outlined"
          color="error"
          onClick={deconnexion}
        >
          <img
            src="../../img/shutdown.png"
            alt="shutdown"
            width="40vw"
            style={{ marginRight: 10 }}
          />
          <Typography fontSize="1.3vw" color="#db0909">
            Déconnexion
          </Typography>
        </Button>
      </Box>
    </div>
  );
}

export default Sidebar;
