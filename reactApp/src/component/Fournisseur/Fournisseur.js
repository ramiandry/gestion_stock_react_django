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
  import AddFournisseur from "./AddFournisseur";
  import axios from "axios";
  import Modifier from "./Modifier";
  
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
  
  function Fournisseur() {
    var theme = useTheme();
    var role = sessionStorage.getItem("admin");
    const header = ["Code", "Nom", "Email", "Adresse", "Contact", ""];
    const classes = useStyles();
    const option = { day: "numeric", month: "long", year: "numeric" };
    var [data, setData] = useState([]);
    var [filter, setFilter] = useState("");
    const source = axios.CancelToken.source();
  
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/fournisseur/all`, {
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
              <TextField type="text" size="small" variant="outlined" onChange={e=>setFilter(e.target.value.trim())} />
            </Box>
            <Box>
            {role == 1 ?<AddFournisseur data={data} setData={setData} />:null}
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
                        align={data !== "" ? "left" : "center"}
                        className={classes.tableCell}
                      >
                        {data}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.filter(item=>item.nom.toLowerCase().indexOf(filter)>-1).map((data) => {
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {data.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.nom}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.adresse}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.tel}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ display: "flex", justifyContent: "space-evenly" }}
                        >
                          {role == 1 ?<Modifier data={data} fetchData={fetchData}/>:null}
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
  
  export default Fournisseur;
  