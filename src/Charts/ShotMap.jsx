import React,{ useState } from "react";
import Chart from "./Chart";
import * as d3 from "d3";
import Circles from "./Circles"

const chartSettigns = {
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
    const [dimensions, setDimensions] = useState(chartSettigns);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimensions.boundedHeight, 0])
        .nice();    

    const xAccessorScaled = d => xScale(xAccessor(d));
    const yAccessorScaled = d => yScale(yAccessor(d));
    const keyAccessor = (d, i) => i;



    return(
        <div className="shotmap">
            <Chart dimensions={dimensions}>
                <Circles 
                    data={data}
                    keyAccessor={keyAccessor}
                    xAccessor={xAccessorScaled}
                    yAccessor={yAccessorScaled}/>
            </Chart>
        </div>
    );
}