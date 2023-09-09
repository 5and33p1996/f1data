import { useState, useEffect } from "react";

import { Card, CardContent, Typography, Skeleton } from "@mui/material";



export function RaceResults({isLoading, results}){
  
    if(isLoading){
  
      let arr = [0, 1, 2];
  
      return (<div className="resultContainer">
        {arr.map((elem) => <Card className="resultCard" key={elem}>
          <CardContent>
            <Typography variant="body1"><Skeleton sx={{width: '10em'}}/></Typography>
          </CardContent>
        </Card>)}
      </div>)
    }
  
    return (<div className="resultContainer">
        {results.map((result, index) => 
        <Card className="resultCard" key={index}>
          <CardContent>
            <div className="resultDiv">
              <div className="leftResultContent">
                <Typography variant="h6">{(index+1).toString().concat('. ', result.forename, ' ',result.surname)}</Typography>
              </div>
              <div style={{width:'10em'}}></div>
              <div className="rightResultContent">
                <Typography variant="h6">{result.time != null?result.time:result.status}</Typography>
              </div>
            </div>
          </CardContent>
        </Card>
        )}
    </div>)
  }