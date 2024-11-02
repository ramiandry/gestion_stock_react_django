import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";

function ChartLine() {
  var [dispatch, setDispatch] = useState([]);
  const theme = useTheme();
  var mois = [
    "Janv",
    "Fevr",
    "Mars",
    "Avri",
    "Mai",
    "Juin",
    "Jull",
    "Aout",
    "Sept",
    "Octo",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDispatch = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/dispatch/all`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDispatch(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchDispatch();
    return () => {
      source.cancel();
    };
  }, []);

  function nbrDispatch(mois) {
    return dispatch.filter((data) => new Date(data.date).getMonth() == mois)
      .length;
  }

  var chart = {
    height: 95,
    options: {
      title: {
        text: "Dispatch ",
        align: "center",
        style: {
          fontSize: "20pt",
          color:theme.palette.primary.light
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      fill: {
        colors: [theme.palette.error.main],
      },
      xaxis: {
        categories: mois,
      },
    },

    series: [
      {
        name: "series-1",
        data: mois.map((data, index) => nbrDispatch(index)),
      },
    ],
  };
  return (
    <Box width="100%" marginBottom="20px">
      <Paper sx={{ height: "50vh", padding: "1vh", margin: 5 }}>
        <Chart
          options={chart.options}
          series={chart.series}
          type="area"
          width="100%"
          height="400px"
        />
      </Paper>
    </Box>
  );
}

export default ChartLine;
