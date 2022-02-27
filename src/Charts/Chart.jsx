import React from "react";
import "./Chart.css"

export default function Chart({dimensions, children}){
    return(
        <svg className="Chart" width={dimensions.width} height={dimensions.height}>
            <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
                { children }
            </g>
        </svg>
    )
}
