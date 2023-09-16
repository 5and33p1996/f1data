import {RaceResults} from './RaceResults'
import { LapTimes } from './LapTimes'
import { Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import useSWRImmutable from 'swr/immutable'
import { baseURL } from '../constants';

export function TabBlock({race}){

    const [tabIndex, setTabIndex] = useState(1);
    const [results, setResults] = useState([]);
    const [driverIndex, setDriverIndex] = useState(-1);

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const {data, error, isLoading} = useSWRImmutable(race == ''?null:`${baseURL}/results/${race}`, fetcher);

    const handleDriverChange = (event) => {
      setDriverIndex(event.target.value);
    }

    let comp;

    useEffect(() => {
      if(data){
        setResults(data);
      }
      else if(race == '' || isLoading){
        setDriverIndex(-1);
        setResults([]);
      }
    }, [data, race, isLoading]);

    if(race == ''){

      comp = (<div className='selectRace'>
        <Typography variant='body1'>Please select a race</Typography>
      </div>)
    }
    else{
      comp = tabIndex == 1 ? <RaceResults isLoading={isLoading} results={results}/>:
        <LapTimes race={race} results={results} driverIndex={driverIndex} handleDriverChange={handleDriverChange} isResultsLoading={isLoading}/>
    }

    return (<div className="centerData">
        <TabLabel tabIndex = {tabIndex} setTabIndex = {setTabIndex}/>
        {comp}
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