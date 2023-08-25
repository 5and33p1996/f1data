import {RaceResults} from './RaceResults'
import { LapTimes } from './LapTimes'
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';

export function TabBlock({race}){

    const [tabIndex, setTabIndex] = useState(1);

    return (<div className="centerData">
        <TabLabel tabIndex = {tabIndex} setTabIndex = {setTabIndex}/>
        {tabIndex == 1 ? <RaceResults race={race}/>:<LapTimes/>}
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