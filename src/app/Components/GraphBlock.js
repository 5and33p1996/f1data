import { Typography } from "@mui/material";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function GraphBlock({lapTimes}){
    
    if(!lapTimes){
        return <Typography variant="body1">Loading...</Typography>
    }

    return(<div>
        <LineChart width={730} height={250} data={lapTimes}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="lap" />
    <YAxis dataKey="milliseconds" domain={['dataMin - 2', 'dataMax + 2']}/>
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="milliseconds" stroke="#8884d8" />
    </LineChart>
    </div>)
}