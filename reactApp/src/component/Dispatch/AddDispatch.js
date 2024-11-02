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
  Typography,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

function AddDispatch({ fetchDataDispatch }) {
  var id = sessionStorage.getItem("id");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [dataArticle, setDataArticle] = useState([]);
  const [remarque, setRemarque] = useState("");
  const [agence, setAgence] = useState("");
  const [departement, setDepartement] = useState("");
  const input = {
    article: "",
    quantite: 0,
    total: 0,
  };

  const [listeInput, setListeInput] = useState([input]);
  const [dataAgence, setDataAgence] = useState([]);
  const [dataDepartement, setDataDepartement] = useState([]);

  const fetchDataAgence = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/agence/all`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setDataAgence(res.data);
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request is cancel");
      }
    }
  };

  const fetchDataDepartement = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/departement/all`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setDataDepartement(res.data);
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request is cancel");
      }
    }
  };

  const fetchDataArticle = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/article/all`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setDataArticle(res.data);
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request is cancel");
      }
    }
  };
  useEffect(() => {
    fetchDataAgence();
    fetchDataDepartement();
    fetchDataArticle();
  }, []);
  useEffect(() => {
    setListeInput([input]);
  }, []);
  var [data, setData] = useState([]);
  const source = axios.CancelToken.source();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const create = () => {
    if (date != "" && agence != "" && departement != "") {
      var formData = new FormData();
      formData.append("date", date);
      formData.append("agence", agence);
      formData.append("departement", departement);
      formData.append("membre", id);
      console.log(formData);
      axios
        .post(`http://127.0.0.1:8000/dispatch/add`, formData)
        .then((res) => {
          console.log(res.data);
          createDispatch_article(res.data.id);
          fetchDataDispatch();
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

  const createDispatch_article = (dispatch) => {
    listeInput.map((data) => {
      if (data.article != "" && data.quantite > 0) {
        axios
          .post(`http://127.0.0.1:8000/dispatch_article/add`, {
            article: data.article,
            dispatch: dispatch,
            quantite: data.quantite,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    setOpen(false);
    toast.success("Enregistré avec succèss!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const changer = (e, index) => {
    var updateTab = [...listeInput];
    var tab = updateTab.map((item, key) => {
      //verification de position
      if (key === index) {
        //verification de champs(input) qui change (name="article")
        if (e.target.name == "article") {
          return Object.assign(item, {
            [e.target.name]: e.target.value,
            ["total"]: dataArticle
              .filter((data) => data.id == e.target.value)
              .map((elt) => elt.quantite),
          });
        } else if (e.target.name == "quantite") {
          //verifier si le nombre de quantite dispatcher est inferieur au total de quantité d'article
          if (e.target.valueAsNumber <= item.total) {
            //si c'est inferieur ou egale
            return Object.assign(item, {
              [e.target.name]: e.target.value,
            });
          } else {
            //si c'est superieur
            toast.error(
              "Nombre total de " +
                dataArticle
                  .filter((data) => data.id == item.article)
                  .map((elt) => elt.nom) +
                " est " +
                item.total,
              {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              }
            );
          }
        }
      }
      return item;
    });
    console.log(listeInput);
  };

  const inserer = () => {
    setListeInput([...listeInput, input]);
  };

  return (
    <>
      <Box>
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Nouveau
        </Button>
        <Dialog
          open={open}
          fullWidth
          maxWidth="md"
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Repartie des articles"}
          </DialogTitle>
          <DialogContent>
            <FormGroup method="post" encType="multipart/form-data">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ marginX: 2 }}>
                  <InputLabel>Date :</InputLabel>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="date"
                    size="small"
                    placeholder="Nom du projet"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Box>
                <Box sx={{ marginX: 2 }}>
                  <InputLabel>Agence</InputLabel>
                  <Select
                    id="demo-simple-select-label"
                    fullWidth
                    onChange={(e) => setAgence(e.target.value)}
                    sx={{ height: "40px", width: "200px", marginY: 1 }}
                  >
                    {dataAgence.map((data) => {
                      return (
                        <MenuItem value={data.id} defaultChecked>
                          {data.nom_agence}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
                <Box sx={{ marginX: 2 }}>
                  <InputLabel>Departement</InputLabel>
                  <Select
                    id="demo-simple-select-label"
                    fullWidth
                    onChange={(e) => setDepartement(e.target.value)}
                    sx={{ height: "40px", width: "200px", marginY: 1 }}
                  >
                    {dataDepartement.map((data) => {
                      return (
                        <MenuItem value={data.id} defaultChecked>
                          {data.nom_departement}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="right"
                alignItems="center"
                marginY={3}
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
              <Box>
                {listeInput.map((item, index) => {
                  return (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Select
                        id="demo-simple-select-label"
                        fullWidth
                        onChange={(e) => changer(e, index)}
                        sx={{ height: "40px", marginX: 2 }}
                        name="article"
                      >
                        {dataArticle.map((data) => {
                          return (
                            <MenuItem value={data.id} defaultChecked>
                              {data.nom}
                            </MenuItem>
                          );
                        })}
                      </Select>

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
                    </Box>
                  );
                })}
              </Box>
            </FormGroup>
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
      </Box>
    </>
  );
}

export default AddDispatch;
