import { InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DriverSelect } from "./DriverSelect";
import { GraphBlock } from "./GraphBlock";

import useSWRImmutable from 'swr/immutable'

export function LapTimes({race, results, driverIndex, handleDriverChange}){

    const [lapTimes, setLapTimes] = useState([]);

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    console.log(`Driver Index - ${driverIndex}`);

    const {data, err} = useSWRImmutable(driverIndex != -1?`http://192.168.1.11:2000/laptimes/${race}/${results[driverIndex].driverId}`:null, fetcher);

    console.log(data);
    useEffect(() => {
        setLapTimes(data);
    }, [data]);

    return (<div>
        <DriverSelect results = {results} driverIndex={driverIndex} handleDriverChange={handleDriverChange}/>
        <GraphBlock lapTimes={lapTimes}/>
    </div>)
}