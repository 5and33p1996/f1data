"use client"
import React, { useEffect, useState } from "react";
import "./globals.css";

import '@fontsource/roboto/300.css';
import { Box, InputLabel, MenuItem, Select, Skeleton, Tab, Tabs, Typography } from "@mui/material";

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
      <Tabs value={tabIndex} onChange={handleChange}>

        <Tab value={1} label="Race Results" />
        <Tab value={2} label="Lap Times" />
      </Tabs>
    </div>
  )
}

function RaceSelector(){

  const [season, setSeason] = useState(2023);
  const [races, setRaces] = useState([]);
  const [race, setRace] = useState("");
  const [isLoading, setLoading] = useState(true);

  let seasons = new Array();
  let raceComp;

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleRaceChange = (event) => {
    setRace(event.target.value);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:2000/races/${season}`).then((res) => res.json())
    .then((data) => {
      let arr = [];

      for(let i in data){
        arr.push(data[i]);
      }

      setRaces(arr);
      setRace(arr[0].country);
      setLoading(false);
    });
  }, [season]);

  if (isLoading) {
    raceComp = <Skeleton variant="text" sx={{ width: '5em', height: '5em' }} />
  }
  else {
    raceComp = <div>
      <InputLabel>Race</InputLabel>
      <Select value={race} onChange={handleRaceChange} label="Race">
        {races.map((iRace) => <MenuItem value={iRace.country}>{iRace.country}</MenuItem>)}
      </Select>
    </div>
  }

  for(let i = 1950; i <= 2023; i++){
    seasons.push(i);
  }

  return (<div className="WelcomeContainer">
    <div className="WelcomeItem">
      <InputLabel>Season</InputLabel>
      <Select value={season} onChange={handleSeasonChange} label="Season">
        {seasons.map((season, index) => <MenuItem value={season}>{season}</MenuItem>)}
      </Select>
    </div>

    {raceComp}
  </div>)
}