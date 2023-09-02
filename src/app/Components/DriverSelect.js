import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

export function DriverSelect({results, driverIndex, handleDriverChange}){

    return (<div className="driverSelect">
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
        <InputLabel>Driver</InputLabel>
        <Select value={driverIndex == -1?'':driverIndex} onChange={handleDriverChange}>
            {results.map((result, index) => <MenuItem key={index} value={index}>
                {`${result.forename} ${result.surname}`}
                </MenuItem>)}
        </Select>
        </FormControl>
    </div>)
}