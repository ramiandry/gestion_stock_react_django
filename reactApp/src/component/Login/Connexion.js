import {
  Alert,
  Box,
  Button,
  Divider,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Connexion() {
  var [alerte, setAlerte]=useState('')
  var [email, setEmail] = useState("");
  var [mdp, setMdp] = useState("");
  let navigate=useNavigate()

  const handleClick = async () => {
    var formData = new FormData();
    formData.append("email", email);
    formData.append("mot_de_passe", mdp);

    try {
      await axios.post("http://127.0.0.1:8000/membres/findOne/", formData).then((res)=>{
        console.log(res.data);
        if(res.data.length==1){
          sessionStorage.setItem("id", res.data[0].id);
          sessionStorage.setItem("admin", res.data[0].admin);
          sessionStorage.setItem("authorization", true);
          navigate("/");
          setAlerte('')
        }else{
          setAlerte(<Alert severity="error">Mot de passe ou email incorrecte!!</Alert>)
        }
      })
    } catch (error) {
      console.log(error)
      setAlerte(<Alert severity="error">Verifier votre connexion {"(localhost:8000)"}</Alert>)
    }
  };

  return (
    <Box sx={{width:"80%"}}>
      {alerte}
      <FormGroup method="post" sx={{width:"100%", marginTop:2}}>
        <Divider>
          <img src="../img/cem-logo.png" width={200} />
          <Typography variant="h4">Connexion</Typography>
        </Divider>
        <TextField
          type="text"
          variant="outlined"
          label="Email"
          onChange={(e) => setEmail(e.target.value.trim())}
          fullWidth
          sx={{ marginY: "20px" }}
        />
        <TextField
          type="password"
          variant="outlined"
          label="Mot de passe"
          onChange={(e) => setMdp(e.target.value.trim())}
          fullWidth
          sx={{ marginY: "20px" }}
        />
        <Button
          variant="contained"
          type="submit"
          color="error"
          sx={{ marginX: "50px", width: "70%" }}
          onClick={handleClick}
        >
          CONNEXION
        </Button>
      </FormGroup>
    </Box>
  );
}

export default Connexion;
