import React,{ useState } from "react";
import Chart from "./Chart";
import * as d3 from "d3";
import Circles from "./Circles"
import Rink from "./Rink";

const chartSettings = {
    width: 1000,
    height: 1000,
    marginTop: 100,
    marginRight: 100,
    marginBottom: 100,
    marginLeft: 100,
    boundedHeight: 800,
    boundedWidth: 800,
}

export default function ShotMap({data, xAccessor, yAccessor}){
    const [dimensions, setDimensions] = useState(chartSettings);

    const xScale = d3.scaleLinear()
        .domain([-100, 0])
        .range([0, 470.59])
        .nice();

    const yScale = d3.scaleLinear()
        .domain([42.5, -42.5])
        .range([0, 400])
        .nice();    

    const xAccessorScaled = d => xScale(xAccessor(d));
    const yAccessorScaled = d => yScale(yAccessor(d));
    const keyAccessor = (d, i) => i;

    return(
        <div className="shotmap">
            <Chart dimensions={dimensions}>
                <Rink />
                <Circles 
                    data={data}
                    keyAccessor={keyAccessor}
                    xAccessor={xAccessorScaled}
                    yAccessor={yAccessorScaled}/>
            </Chart>
        </div>
    );
}