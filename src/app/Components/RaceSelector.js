import { InputLabel, Skeleton, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

export function RaceSelector({season, setSeason, races, setRaces, race, setRace}){

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
          {seasons.map((season, index) => <MenuItem value={season} key={season}>{season}</MenuItem>)}
        </Select>
      </div>
  
      {raceComp}
    </div>)
  }