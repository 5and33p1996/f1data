"use client"
import React, { StrictMode, useEffect, useState } from "react";
import "./globals.css";

import '@fontsource/roboto/300.css';
import { Box, Card, CardContent, InputLabel, MenuItem, Select, Skeleton, Tab, Tabs, Typography } from "@mui/material";

import { RaceSelector } from "./Components/RaceSelector";
import { RaceResults } from "./Components/RaceResults";

export default function App() {

  return (<div>
    {/* <StrictMode> */}
      <WelcomeBlock />

      <DataBlock />
    {/* </StrictMode> */}
  </div>);
}

function WelcomeBlock(){

  return (<div className="WelcomeContainer">
    <div className="WelcomeItem">
      <Typography variant="h1" gutterBottom>F1 Data</Typography>
    </div>
    <div className="WelcomeItem">
      <Typography variant="h3" gutterBottom>Access F1 data to gain valuable insights into each drivers performance.</Typography>
    </div>
  </div>)
}

function DataBlock(){

  const [tabIndex, setTabIndex] = useState(1);

  const [race, setRace] = useState("");
  const [results, setResults] = useState([]);

  const handleRaceChange = (event) => {
    setRace(event.target.value);
  }

  console.log('Rendering Data Block component');

  return (<div>
    
    <div className="raceSelect">
    <RaceSelector race={race} handleRaceChange={handleRaceChange}/>
    </div>

    <div className="centerData">
    <TabLabel tabIndex = {tabIndex} setTabIndex = {setTabIndex}/>
    <RaceResults race={race} results={results} setResults={setResults}/>
    </div>
  </div>)
}

function TabLabel({tabIndex, setTabIndex}){
  
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  }

  return (
    <div>
      <Tabs value={tabIndex} onChange={handleChange}>

        <Tab value={1} label="Race Results" />
        <Tab value={2} label="Lap Times" />
      </Tabs>
    </div>
  )
}