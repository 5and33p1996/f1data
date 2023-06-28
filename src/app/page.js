"use client"
import React, { useState } from "react";
import "./globals.css";

import '@fontsource/roboto/300.css';
import { Box, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from "@mui/material";

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

  return (<div className="TabLabel">
    <TabLabel tabIndex = {tabIndex} setTabIndex = {setTabIndex}/>
  </div>)
}

function TabLabel({tabIndex, setTabIndex}){
  
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  }

  return (
    <div>
      <RaceSelector />
      <Tabs value={tabIndex} onChange={handleChange} 
      textColor="#b600ff">

        <Tab value={1} label="Race Results"/>
        <Tab value={2} label="Lap Times"/>
      </Tabs>
    </div>
  )
}

function RaceSelector(){

  const [season, setSeason] = useState(2023);

  let seasons = new Array();

  for(let i = 1950; i <= 2023; i++){
    seasons.push(i);
  }

  const handleChange = (event) => {
    setSeason(event.target.value);
    console.log(event.target.value);
  };

  return (<div>
    <InputLabel>Season</InputLabel>
    <Select value={season} onChange={handleChange} label="Season">
      {seasons.map((season, index) => <MenuItem value={season}>{season}</MenuItem>)}
    </Select>
  </div>)
}