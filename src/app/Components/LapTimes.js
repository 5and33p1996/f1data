import { InputLabel, MenuItem, Select, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DriverSelect } from "./DriverSelect";
import { GraphBlock } from "./GraphBlock";

import useSWRImmutable from 'swr/immutable'

export function LapTimes({race, results, driverIndex, handleDriverChange, isResultsLoading}){

    const [lapTimes, setLapTimes] = useState([]);

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const {data, err, isLoading} = useSWRImmutable(driverIndex != -1?`http://192.168.1.11:2000/laptimes/${race}/${results[driverIndex].driverId}`:null, fetcher);

    useEffect(() => {
        if(data){
            setLapTimes(data);
        }
    }, [data]);

    return (<div>
        {isResultsLoading?<div className="driverSelect"><Skeleton variant="text" sx={{ width: '10em', height: '5em' }} /></div>:
            <DriverSelect results = {results} driverIndex={driverIndex} handleDriverChange={handleDriverChange}/>}
        {driverIndex == -1?<div className="graphBlock"><Typography variant="body1">Select a Driver</Typography></div> : 
            <GraphBlock lapTimes={lapTimes} isLoading={isLoading}/>
        }
    </div>)
}