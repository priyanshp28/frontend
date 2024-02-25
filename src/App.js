import React ,{useEffect,useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Page from "../src/pages/Page";
import Button from './components/Button';


function App() {

  return (
    <>
    <div id="home">

    <Page/>
    <Button/>
    </div>
    </>
  );
}

export default App;
