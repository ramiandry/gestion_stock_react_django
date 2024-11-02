import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import axios from "axios";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
function ChartPie() {
  var [dataArticle, setDataArticle] = useState([]);
  var [dataFourniture, setDataFourniture] = useState([]);

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
    const fetchDataArticle = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/article/all`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setDataArticle(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchDataArticle();
    fetchDataFournisseur();
    return () => {
      source.cancel();
    };
  }, []);

  function nbrArticle(fourniture) {
    return dataArticle.filter(data=>data.fourniture==fourniture).length
  }

  const theme = useTheme();
  var chart = {
    height: 95,
    options: {
      chart: {
        id: "support-chart",
        sparkline: {
          enabled: true,
        },
      },
      fill: {
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      title: {
        text: "Categorie ",
        align: "center",
        style: {
          fontSize: "20pt",
          fontFamily: "arial",
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
        position: "bottom",
        customLegendItems: [...dataFourniture.map((data) => data.type)],
      },
      colors: [
        theme.palette.primary.main,
        theme.palette.error.main,
        theme.palette.warning.main,
        theme.palette.success.main,
      ],
    },

    series: [...dataFourniture.map(item=>nbrArticle(item.id))],
  };
  return (
    <Box width="35vw" margin="1vh">
      <Paper sx={{ height: "50vh", padding: "1vh" }}>
        <div>
          <Chart
            options={chart.options}
            series={chart.series}
            type="pie"
            width="90%"
          />
        </div>
      </Paper>
    </Box>
  );
}

export default ChartPie;
