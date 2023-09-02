import { InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { DriverSelect } from "./DriverSelect";

export function LapTimes({results}){

    const [driver, setDriver] = useState('');

    const handleDriverChange = (event) => {
        setDriver(event.target.value);
    }

    return (<div>
        <DriverSelect results = {results} driver={driver} handleDriverChange={handleDriverChange}/>
    </div>)
}