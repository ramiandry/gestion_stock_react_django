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
import { FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EditArticle({ dataFournisseur, dataFourniture, item, fetchData }) {
  const [open, setOpen] = useState(false);
  const [quantite, setQuantite] = useState(item.quantite);
  const [fournisseur, setFournisseur] = useState(item.fournisseur);
  const [fourniture, setFourniture] = useState(item.fourniture);
  const [nom, setNom] = useState(item.nom);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const edit = () => {
    if (nom !== "" && fournisseur !== "") {
      var formData = new FormData();
      formData.append("nom", nom);
      formData.append("quantite", quantite);
      formData.append("fournisseur", fournisseur);
      formData.append("fourniture", fourniture);
      axios
        .put(`http://127.0.0.1:8000/article/edit/${item.id}`, formData)
        .then((res) => {
          fetchData()
          setOpen(false);
          toast.success("Modifié avec succèss!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }else {
      toast.error("Veuillez remplir les champs!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };


  return (
    <>
      <Box>
        <Button onClick={handleClickOpen} color="warning" variant="contained">
          Modifier
        </Button>
        <FormGroup method="post" encType="multipart/form-data">
          <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Modifier un article"}
            </DialogTitle>
            <DialogContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <TextField
                  margin="dense"
                  size="small"
                  type="text"
                  fullWidth
                  value={nom}
                  variant="outlined"
                  sx={{ marginX: 2 }}
                  onChange={(e) => setNom(e.target.value)}
                />
                <TextField
                  margin="dense"
                  size="small"
                  name="quantite"
                  type="number"
                  value={quantite}
                  fullWidth
                  sx={{ marginX: 2 }}
                  variant="outlined"
                  onChange={(e) => setQuantite(e.target.value)}
                />
                <Select
                  id="demo-simple-select-label"
                  fullWidth
                  name="fournisseur"
                  value={fournisseur}
                  onChange={(e) => setFournisseur(e.target.value)}
                  sx={{ height: "40px", marginX: 2 }}
                >
                  {dataFournisseur.map((data) => {
                    return <MenuItem value={data.id}>{data.nom}</MenuItem>;
                  })}
                </Select>
                <Select
                  id="demo-simple-select-label"
                  fullWidth
                  name="fourniture"
                  value={fourniture}
                  onChange={(e) => setFourniture(e.target.value)}
                  sx={{ height: "40px", marginX: 2 }}
                >
                  {dataFourniture.map((data) => {
                    return (
                      <MenuItem
                        sx={{ textTransform: "capitalize !important" }}
                        value={data.id}
                      >
                        {data.type}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>
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

export default EditArticle;
