import { InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

export function DriverSelect({results, driver, handleDriverChange}){
    return (<div>
        <InputLabel>Driver</InputLabel>
        <Select label='Driver' value={driver} onChange={handleDriverChange}>
            {results.map((result, index) => <MenuItem key={index} value={result.driverId}>{`${result.forename} ${result.surname}`}</MenuItem>)}
        </Select>
    </div>)
}