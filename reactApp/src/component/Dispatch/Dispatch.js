import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import InfoDispatch from "./InfoDispatch";
import AddDispatch from "./AddDispatch";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    table: {
      width: "100%",
    },
    tableContainer: {
      margin: "10px",
    },
    tableCell: {
      color:
        theme.palette.getContrastText(theme.palette.grey[200]) + " !important",
      backgroundColor: theme.palette.grey[200],
      fontWeight: "bolder" + " !important",
      textTransform: "capitalize",
    },
  };
});

function Dispatch() {
  var theme = useTheme();
  var role = sessionStorage.getItem("admin");
  const [dataAgence, setDataAgence] = useState([]);
  const [dataDepartement, setDataDepartement] = useState([]);
  const [dataMembre, setDataMembre] = useState([]);
  const [data, setData] = useState([]);
  const header = [
    "Code",
    "date",
    "Saisie par",
    "Agence",
    "Departement",
    "",
  ];
  const classes = useStyles();
  const option = { day: "numeric", month: "long", year: "numeric" };
  const source = axios.CancelToken.source();
  var [filter, setFilter] = useState("");

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

  const fetchDataMembre = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/membres/findAll/`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setDataMembre(res.data);
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request is cancel");
      }
    }
  };

  const fetchDataDispatch = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/dispatch/all`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setData(res.data);
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
    fetchDataMembre();
    fetchDataDispatch();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "fit-content",
        justifyContent: "center",
      }}
    >
      <Box width={"100%"}>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
          marginX={4}
          height="50px"
        >
          <Box display={"flex"} alignItems="center">
            <Typography>Rechercher: </Typography>
            <TextField type="text" size="small" variant="outlined" onChange={(e) => setFilter(e.target.value.trim())}/>
          </Box>
          <Box>
          {role == 1 ?<AddDispatch fetchDataDispatch={fetchDataDispatch} />:null}
          </Box>
        </Box>
        <Box width={"100%"} display={"flex"} justifyContent="center">
          <TableContainer
            component={Paper}
            sx={{ width: "95%", margin: "auto" }}
            className={classes.tableContainer}
          >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {header.map((data) => (
                    <TableCell
                      align={data !== "Action" ? "left" : "center"}
                      className={classes.tableCell}
                    >
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.filter(
                    (item) =>
                      new Date(item.date)
                        .toLocaleDateString("fr-FR", option)
                        .toLowerCase()
                        .indexOf(filter.toLowerCase()) > -1
                  ).map((data) => {
                  var info = {
                    id: data.id,
                    date: data.date,
                    remarque:data.remarque
                  };
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {data.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {new Date(data.date).toLocaleDateString(
                          "fr-FR",
                          option
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {dataMembre
                          .filter((item) => item.id == data.membre)
                          .map((elt) => {
                            info = Object.assign(info, {
                              ["membre"]: elt.username,
                            });
                            return elt.username;
                          })}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {dataAgence
                          .filter((item) => item.id == data.agence)
                          .map((elt) => {
                            info = Object.assign(info, {
                              ["agence"]: elt.nom_agence,
                            });
                            return elt.nom_agence;
                          })}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {dataDepartement
                          .filter((item) => item.id == data.departement)
                          .map((elt) => {
                            info = Object.assign(info, {
                              ["departement"]: elt.nom_departement,
                            });
                            return elt.nom_departement;
                          })}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "space-evenly" }}
                      >
                       {role == 1 ? <InfoDispatch info={info} />:null}
                        {/*<Button variant="contained" color="error">
                          Supprimer
                        </Button>*/}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TableFooter
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box marginRight={3}></Box>
            </TableFooter>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}

export default Dispatch;
