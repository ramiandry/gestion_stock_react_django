import {
  Box,
  Paper,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";



function ChartBar() {
  const [agence, setAgence] = useState([]);
  var [demande, setDemande] = useState([]);
  const source = axios.CancelToken.source();
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDemande = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/demande/all`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setDemande(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };

    const fetchAgence = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/agence/all`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setAgence(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchAgence();
    fetchDemande();
    return () => {
      source.cancel();
    };
  }, []);

  function data(id_agence) {
   return  demande.filter(item=>item.agence==id_agence).length
  }

  const theme = useTheme()
  var chart = {
    height: 95,
    options: {
      title: {
        text: "Demande ",
        align: "center",
        style: {
          fontSize: "20pt",
          color:theme.palette.error.main
        }
      },
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: agence.map(item=>item.nom_agence)
      }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.success.main,
    ],
    series: [
      {
        name: "series-1",
        data: agence.map((item)=>data(item.id))
      }
    ]
  };
  return (
    <>
      <Box width="35vw" margin="1vh">
        <Paper sx={{ height: "50vh", padding: "1vh" }}>
          <ReactApexChart
            options={chart.options}
            series={chart.series}
            type="bar"
            width="98%"
          />
        </Paper>
      </Box>
    </>
  );
}

export default ChartBar;
