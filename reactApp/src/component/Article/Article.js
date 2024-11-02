import {
  Box,
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
import React from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import AddArticle from "./AddArticle";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import EditArticle from "./EditArticle";

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

function Article() {
  var theme = useTheme();
  var role = sessionStorage.getItem("admin");
  const header = ["Code", "Description", "Quantité", "Fournisseur", "Fourniture", ""];
  const classes = useStyles();
  const option = { day: "numeric", month: "long", year: "numeric" };
  var [data, setData] = useState([]);
  const [dataFournisseur, setDataFournisseur] = useState([]);
  const [dataFourniture, setDataFourniture] = useState([])
  var [filter, setFilter] = useState("");
  const source = axios.CancelToken.source();

  const fetchData = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/article/all`, {
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
    fetchData();
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDataFournisseur = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/fournisseur/all`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setDataFournisseur(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchDataFournisseur();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDataFournisseur = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/fourniture/all`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setDataFourniture(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchDataFournisseur();
    return () => {
      source.cancel();
    };
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
            <TextField type="text" size="small" variant="outlined" onChange={e=>setFilter(e.target.value.trim())}/>
          </Box>
          <Box>
          {role == 1 ?<AddArticle data={data} setData={setData} dataFournisseur={dataFournisseur} dataFourniture={dataFourniture}/>:null}
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
                    <TableCell align="left" className={classes.tableCell}>
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.filter(item=>item.nom.toLowerCase().indexOf(filter)>-1).map((data) => {
                  var item={
                    id:data.id,
                    nom:data.nom,
                    quantite:data.quantite,
                    fournisseur:data.fournisseur,
                    fourniture:data.fourniture
                  }
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {data.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.nom}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.quantite}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{textTransform:"capitalize"}}>
                      {dataFournisseur.filter((item)=>item.id===data.fournisseur).map((data)=>data.nom)}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{textTransform:"capitalize"}}>
                      {dataFourniture.filter((item)=>item.id===data.fourniture).map((data)=>data.type)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                      {role == 1 ?<EditArticle item={item} dataFournisseur={dataFournisseur} dataFourniture={dataFourniture} fetchData={fetchData}/>:null}
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

export default Article;
