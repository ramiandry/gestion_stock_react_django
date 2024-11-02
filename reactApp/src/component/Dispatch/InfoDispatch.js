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

function InfoDispatch({ fetchDataDemande, info }) {
  const [open, setOpen] = useState(false);
  const [dispatch_article, setDispatch_article] = useState([]);
  const [article, setArticle] = useState([]);
  const source = axios.CancelToken.source();

  const fetchDemande_article = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/dispatch_article/all`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setDispatch_article(res.data);
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request is cancel");
      }
    }
  };

  const fetchArticle = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/article/all`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setArticle(res.data);
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request is cancel");
      }
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchDemande_article();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Button variant="contained" color="info" onClick={handleClickOpen}>
          Information
        </Button>
        <Dialog
          open={open}
          fullWidth
          maxWidth="md"
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Information de dispatch"}
          </DialogTitle>
          <DialogContent>
            <FormGroup method="post" encType="multipart/form-data">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ marginX: 2 }}>
                  <InputLabel>Date de création</InputLabel>
                  <TextField
                    margin="dense"
                    type="text"
                    size="small"
                    fullWidth
                    variant="outlined"
                    value={new Date(info.date).toLocaleDateString("fr-FR")}
                  />
                </Box>
                <Box sx={{ marginX: 2 }}>
                  <InputLabel>Agence</InputLabel>
                  <TextField
                    margin="dense"
                    type="text"
                    size="small"
                    fullWidth
                    variant="outlined"
                    value={info.agence}
                  />
                </Box>
                <Box sx={{ marginX: 2 }}>
                  <InputLabel>Departement</InputLabel>
                  <TextField
                    margin="dense"
                    type="text"
                    size="small"
                    fullWidth
                    variant="outlined"
                    value={info.departement}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                marginY={3}
              >
                <Typography variant="h5">Listes des articles</Typography>
              </Box>
              <Box>
                {dispatch_article
                  .filter((data) => data.dispatch == info.id)
                  .map((item, index) => {
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
                          value={article
                            .filter((elt) => elt.id == item.article)
                            .map((i) => i.nom)}
                          fullWidth
                          sx={{ marginX: 2 }}
                          variant="outlined"
                        />

                        <TextField
                          margin="dense"
                          size="small"
                          type="number"
                          value={item.quantite}
                          fullWidth
                          sx={{ marginX: 2 }}
                          variant="outlined"
                        />
                      </Box>
                    );
                  })}
              </Box>
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default InfoDispatch;
