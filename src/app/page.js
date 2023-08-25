"use client"
import React, { StrictMode, useEffect, useState } from "react";
import "./globals.css";

import '@fontsource/roboto/300.css';
import { Box, Card, CardContent, InputLabel, MenuItem, Select, Skeleton, Tab, Tabs, Typography } from "@mui/material";

import { RaceSelector } from "./Components/RaceSelector";
import { RaceResults } from "./Components/RaceResults";
import { LapTimes } from "./Components/LapTimes";
import { TabBlock } from "./Components/TabBlock";

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

  const [race, setRace] = useState('');

  const handleRaceChange = (event) => {
    setRace(event.target.value);
  }

  const invalidateRace = () => setRace('');

  console.log('Rendering Data Block component');

  return (<div>
    
    <div className="raceSelect">
    <RaceSelector race={race} handleRaceChange={handleRaceChange} invalidateRace={invalidateRace}/>
    </div>

    <TabBlock race={race}/>
  </div>)
}