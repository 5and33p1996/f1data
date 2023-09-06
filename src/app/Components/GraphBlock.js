import { Typography } from "@mui/material";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";

export function GraphBlock({lapTimes}){
    
    if(!lapTimes){
        return <Typography variant="body1">Loading...</Typography>
    }

    return(<div className="graphBlock">
        <LineChart width={800} height={500} data={lapTimes}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="lap"><Label value="Lap" position="insideBottom" offset={0}/></XAxis>
    <YAxis dataKey="seconds" domain={['dataMin - 2', 'dataMax + 2']}><Label value="Lap Time in Seconds" angle="-90" position="insideLeft" offset={-10}/></YAxis>
    <Tooltip />
    <Line type="monotone" dataKey="seconds" stroke="#8884d8" />
    </LineChart>
    </div>)
}