import React from "react";


export default function Shots({data, xAccessor, yAccessor}){
    return(
    <React.Fragment>
        {data.map((d) => (
            <circle className="shots"
                cx={xAccessor(d)}
                cy={yAccessor(d)}
                r={3}
            />
        ))}
    </React.Fragment>        
    )
}