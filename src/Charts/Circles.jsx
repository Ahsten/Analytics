import React from "react";

export default function Shots({data, xAccessor, yAccessor, team}){
    return(
    <React.Fragment>
        {data.map((d) => {
            if(d.team === team)
            return(<circle className="shots"
                    cx={xAccessor(d)}
                    cy={yAccessor(d)}
                    r={3}
                />
            )})}
    </React.Fragment>        
    )
}