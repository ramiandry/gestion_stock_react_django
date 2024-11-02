import {
  Box,
  Button,
  InputLabel,
  TextField,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddFournisseur({data, setData}) {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const create = () => {
    if (nom != "" && email != "" && tel != "" && adresse != "") {
    var formData = new FormData();
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("tel", tel);
    formData.append("adresse", adresse);
    axios
      .post(`http://127.0.0.1:8000/fournisseur/add`, formData)
      .then((res) => {
        console.log(res.data);
        setData([...data, res.data])
        setOpen(false)
        toast.success("Enregistré avec succèss!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      toast.error("Veuillez remplir les champs!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Box>
        <Button onClick={handleClickOpen} color="primary" variant="contained">
          Nouveau
        </Button>
        <FormGroup method="post" encType="multipart/form-data">
          <Dialog
            open={open}
            fullWidth
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Ajouter une agence"}
            </DialogTitle>
            <DialogContent>
              <InputLabel id="demo-simple-select-label">Nom</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                placeholder="Nom du projet"
                fullWidth
                variant="outlined"
                onChange={(e) => setNom(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Email</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="debut"
                type="email"
                fullWidth
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">
                N° Telephone
              </InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="deadline"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setTel(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">
                Adresse
              </InputLabel>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setAdresse(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={create}
              >
                Ajouter
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Annuler
              </Button>
            </DialogActions>
          </Dialog>
        </FormGroup>
      </Box>
    </>
  );
}

export default AddFournisseur;
