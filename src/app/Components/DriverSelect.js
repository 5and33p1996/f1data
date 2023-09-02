import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

export function DriverSelect({results, driver, handleDriverChange}){

    return (<div className="driverSelect">
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
        <InputLabel>Driver</InputLabel>
        <Select value={driver} onChange={handleDriverChange}>
            {results.map((result, index) => <MenuItem key={index} value={`${result.forename} ${result.surname}`}>
                {`${result.forename} ${result.surname}`}
                </MenuItem>)}
        </Select>
        </FormControl>
    </div>)
}