import {RaceResults} from './RaceResults'
import { LapTimes } from './LapTimes'
import { Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';

import useSWRImmutable from 'swr/immutable'

export function TabBlock({race}){

    const [tabIndex, setTabIndex] = useState(1);
    const [results, setResults] = useState([]);

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const {data, error} = useSWRImmutable(race === ''?null:`http://192.168.1.11:2000/results/${race}`, fetcher);

    useEffect(() => {
      if(data){
        setResults(data);
      }
    }, [data]);

    return (<div className="centerData">
        <TabLabel tabIndex = {tabIndex} setTabIndex = {setTabIndex}/>
        {tabIndex == 1 ? <RaceResults race={race} results={results}/>:<LapTimes results={results}/>}
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