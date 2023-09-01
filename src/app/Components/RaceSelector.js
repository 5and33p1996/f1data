import { InputLabel, Skeleton, Select, MenuItem } from "@mui/material";
import { useState, memo } from "react";

import useSWRImmutable from 'swr/immutable'

export function RaceSelector({race, handleRaceChange, invalidateRace}){

    let seasons = new Array();
    let raceComp;

    const [season, setSeason] = useState(2023);

    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    
    const handleSeasonChange = (event) => {
      setSeason(event.target.value);
      invalidateRace();
    };

    const {data, error} = useSWRImmutable(`http://localhost:2000/races/${season}`, fetcher);
  
    if (!data) {
      raceComp = <Skeleton variant="text" sx={{ width: '5em', height: '5em' }} />
    }
    else {

        raceComp = <div>
            <InputLabel>Race</InputLabel>
            <Select value={race} onChange={handleRaceChange} label="Race">
                {data.map((iRace) => <MenuItem key={iRace.raceId} value={iRace.raceId}>{iRace.country}</MenuItem>)}
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