import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./dashbord.css";

function Dashbord() {
  var [data, setData] = useState({});
  var id = sessionStorage.getItem("id");
  let navigate = useNavigate();
  var autorisation = sessionStorage.getItem("authorization");
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (!autorisation) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          await axios
            .get(`http://127.0.0.1:8000/membres/findOneByPk/${id}`, {
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

      fetchData();
      return () => {
        source.cancel();
      };
    }
  }, []);

  return (
    <>
      {autorisation ? (
        <div>
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="navbar">
             <Navbar avatar={data.avatar} username={data.username} admin={data.admin}/>
          </div>
          <div className="body">
            <Outlet/>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Dashbord;
