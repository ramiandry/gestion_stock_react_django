import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Navbar from './component/navbar/Navbar';
import Acceuil from './component/Acceuil/Acceuil';
import Dashbord from './component/Dashboard/Dashbord';
import Login from './component/Login/Login';
import Agence from './component/Agence/Agence';
import Demande from './component/Demande/Demande';
import Article from './component/Article/Article';
import AddDemande from './component/Demande/AddDemande';
import Fournisseur from './component/Fournisseur/Fournisseur';
import Dispatch from './component/Dispatch/Dispatch';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
     <ToastContainer/>
   <Router>
      <Routes>
      <Route path='login/' element={<Login/>}/>
      <Route path="/" element={<Dashbord/>}>
        <Route path="/" element={<Acceuil/>}/>
        <Route path="agence/" element={<Agence/>}/>
        <Route path="demande/" element={<Demande/>}/>
        <Route path="demande/add_demande/" element={<AddDemande/>}/>
        <Route path="article/" element={<Article/>}/>
        <Route path="dispatch/" element={<Dispatch/>}/>
        <Route path="fournisseur/" element={<Fournisseur/>}/>
      </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
