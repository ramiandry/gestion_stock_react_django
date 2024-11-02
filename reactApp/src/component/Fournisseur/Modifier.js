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

function Modifier({ data, fetchData }) {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState(data.nom);
  const [email, setEmail] = useState(data.email);
  const [tel, setTel] = useState(data.tel);
  const [adresse, setAdresse] = useState(data.adresse);

  useEffect(() => {
    setNom(data.nom);
    setEmail(data.email);
    setTel(data.tel);
    setAdresse(data.adresse);
  }, [data]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const edit = () => {
    if (nom !== "" && email !== "" && tel !== "" && adresse !== "") {
      var formData = new FormData();
      formData.append("nom", nom);
      formData.append("email", email);
      formData.append("tel", tel);
      formData.append("adresse", adresse);
      axios
        .put(`http://127.0.0.1:8000/fournisseur/edit/${data.id}`, formData)
        .then((res) => {
          console.log(res.data);
          fetchData();
          setOpen(false);
          toast.success("Modifié avec succèss!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Veuillez remplir les champs!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Box>
        <Button onClick={handleClickOpen} variant="contained" color="warning">
          Modifier
        </Button>
        <FormGroup method="post" encType="multipart/form-data">
          <Dialog
            open={open}
            fullWidth
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Modifier un fornisseur"}
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
                value={nom}
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
                value={email}
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
                value={tel}
                variant="outlined"
                onChange={(e) => setTel(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Adresse</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                value={adresse}
                variant="outlined"
                onChange={(e) => setAdresse(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={edit}
              >
                Modifier
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

export default Modifier;
