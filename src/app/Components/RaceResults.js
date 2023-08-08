import { useState, useEffect } from "react";

import { Card, CardContent, Typography, Skeleton } from "@mui/material";

export function RaceResults({race, results, setResults}){

    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);
      fetch(`http://localhost:2000/results/${race}`).then((res) => res.json())
      .then((data)=> {
        let arr = [];
  
        for(let i in data){
  
          arr.push(data[i]);
        }
  
        setResults(arr);
        setLoading(false);
        console.log(arr);
      });
    }, [race]);
  
    if(race == null){
      return;
    }
  
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