"use client"
import React, { useEffect, useState } from "react";
import "./globals.css";

import '@fontsource/roboto/300.css';
import { Box, Card, CardContent, InputLabel, MenuItem, Select, Skeleton, Tab, Tabs, Typography } from "@mui/material";

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

function RaceSelector({season, setSeason, races, setRaces, race, setRace}){

  let seasons = new Array();
  let raceComp;

  const [isLoading, setLoading] = useState(true);

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleRaceChange = (event) => {
    setRace(event.target.value);
    console.log(event.target.value);
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
      setRace(arr[0].raceId);
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
        {races.map((iRace) => <MenuItem key={iRace.raceId} value={iRace.raceId}>{iRace.country}</MenuItem>)}
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

function RaceResults({race, results, setResults}){

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:2000/results/${race}`).then((res) => res.json())
    .then((data)=> {
      let arr = [];

      for(let i in data){

        arr.push(data[i]);
      }

      setResults(arr);
      setLoading(false);
      console.log(arr);
    });
  }, [race]);

  if(race == null){
    return;
  }

  if(isLoading){

    let arr = [0, 1, 2];

    return (<div className="resultContainer">
      {arr.map(() => <Card className="resultCard">
        <CardContent>
          <Typography variant="body1"><Skeleton sx={{width: '10em'}}/></Typography>
        </CardContent>
      </Card>)}
    </div>)
  }

  return (<div className="resultContainer">
      {results.map((result, index) => 
      <Card className="resultCard">
        <CardContent>
          <div className="resultDiv">
            <div className="leftResultContent">
              <Typography variant="body1">{(index+1).toString().concat('. ', result.forename, ' ',result.surname)}</Typography>
            </div>
            <div style={{width:'10em'}}></div>
            <div className="rightResultContent">
              <Typography variant="body1">{result.time != null?result.time:result.status}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      )}
  </div>)
}