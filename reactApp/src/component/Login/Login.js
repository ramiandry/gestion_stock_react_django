import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Connexion from "./Connexion";
import "./login.css";

function Login() {

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          elevation={3}
          sx={{
            width: "450px",
            height: "500px",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "5px",
            alignItems:"center",
            border:"1px solid red"
          }}
        >
          <Box
            width="100%"
            marginRight="2%"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Connexion />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
export default Login;
