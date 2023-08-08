"use client"
import React, { useEffect, useState } from "react";
import "./globals.css";

import '@fontsource/roboto/300.css';
import { Box, Card, CardContent, InputLabel, MenuItem, Select, Skeleton, Tab, Tabs, Typography } from "@mui/material";

import { RaceSelector } from "./Components/RaceSelector";
import { RaceResults } from "./Components/RaceResults";

export default function App() {

  return (<div>
    <WelcomeBlock />

    <DataBlock />
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

  const [season, setSeason] = useState(2023);
  const [races, setRaces] = useState([]);
  const [race, setRace] = useState(null);
  const [results, setResults] = useState([]);

  return (<div>
    
    <div className="raceSelect">
    <RaceSelector season={season} setSeason={setSeason} races={races} setRaces={setRaces} 
      race={race} setRace={setRace}/>
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