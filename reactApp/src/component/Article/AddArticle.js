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

function AddArticle({ data, setData, dataFournisseur, dataFourniture }) {
  const [open, setOpen] = useState(false);
  const input = {
    nom: "",
    quantite: 0,
    fournisseur: 1,
    fourniture: 1,
  };

  const [listeInput, setListeInput] = useState([input]);

  useEffect(() => {
    setListeInput([input]);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const create = () => {
    var nbr = 0;
    listeInput.map((item) => {
      if (item.nom !== "" && item.fournisseur !== "") {
        var formData = new FormData();
        formData.append("nom", item.nom);
        formData.append("quantite", item.quantite);
        formData.append("fournisseur", item.fournisseur);
        formData.append("fourniture", item.fourniture);
        axios
          .post(`http://127.0.0.1:8000/article/add`, formData)
          .then((res) => {
            console.log(res.data);
            setData([...data, res.data]);
            setOpen(false);
             nbr++
             toast.info(nbr + " article enregistré!", {
               position: toast.POSITION.TOP_RIGHT,
               autoClose: 3000,
             });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const changer = (e, index) => {
    var updateTab = [...listeInput];
    var tab = updateTab.map((item, key) => {
      if (key === index) {
        return Object.assign(item, { [e.target.name]: e.target.value });
      }
      return item;
    });
    console.log(input);
    setListeInput(tab);
  };

  const inserer = () => {
    setListeInput([...listeInput, input]);
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
            maxWidth="md"
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Ajouter un article"}
            </DialogTitle>
            <DialogContent>
              <Box
                display="flex"
                justifyContent="right"
                alignItems="center"
                marginBottom={4}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginX: 2 }}
                  onClick={inserer}
                >
                  <FaPlus /> inserer
                </Button>
              </Box>
              {listeInput.map((item, index) => {
                return (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <TextField
                      margin="dense"
                      size="small"
                      type="text"
                      name="nom"
                      placeholder="Description"
                      fullWidth
                      value={item.description}
                      variant="outlined"
                      sx={{ marginX: 2 }}
                      onChange={(e) => changer(e, index)}
                    />
                    <TextField
                      margin="dense"
                      size="small"
                      name="quantite"
                      type="number"
                      placeholder="Quantité"
                      value={item.quantite}
                      fullWidth
                      sx={{ marginX: 2 }}
                      variant="outlined"
                      onChange={(e) => changer(e, index)}
                    />
                    <Select
                      id="demo-simple-select-label"
                      fullWidth
                      name="fournisseur"
                      value={item.fournisseur}
                      onChange={(e) => changer(e, index)}
                      sx={{ height: "40px", marginX: 2 }}
                    >
                      {dataFournisseur.map((data) => {
                        return (
                          <MenuItem value={data.id} defaultChecked>
                            {data.nom}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Select
                      id="demo-simple-select-label"
                      fullWidth
                      name="fourniture"
                      value={item.fourniture}
                      onChange={(e) => changer(e, index)}
                      sx={{ height: "40px", marginX: 2 }}
                    >
                      {dataFourniture.map((data) => {
                        return (
                          <MenuItem value={data.id} defaultChecked>
                            {data.type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                );
              })}
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

export default AddArticle;
