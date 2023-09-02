import { InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { DriverSelect } from "./DriverSelect";

export function LapTimes({results, driverIndex, handleDriverChange}){

    return (<div>
        <DriverSelect results = {results} driverIndex={driverIndex} handleDriverChange={handleDriverChange}/>
    </div>)
}