// /* eslint-disable react/prop-types */
// import * as React from "react"
// import { useState } from "react"
// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   HorizontalGridLines,
//   VerticalGridLines,
//   LineSeries,
//   Crosshair,
// } from "react-vis"

// import "react-vis/dist/style.css"

// export default function Graph({ data, yAxisTitle }) {
//   //   const processedData = data.map(entry => ({ x: entry[0], y: entry[1] }))
//   const processedData = data

//   /**
//    * event handler functions
//    */
//   const [crosshairValue, setCrosshairValue] = useState([{ x: 1, y: -1 }])
//   const [crosshairVisible, setCrosshairVisible] = useState(true)
//   const [lastCrosshairValue, setLastCrosshairValue] = useState([{ x: 0, y: 0 }])
//   const [lastTimeStampValue, setLastTimeStampValue] = useState("")

//   /**
//    * Update the value of the nearest element in state so that can be directly shown when required
//    * @param {{x,y}} point
//    */
//   const _updateNearestValue = point => {
//     const { x, y } = point

//     /**
//      * parse the time and perform time calculations only when visible,
//      * give a tiny boost to performance. Since this is a time-series data, an average
//      * page contains thousands of values.
//      */

//     const d = new Date(x)
//     const dateString = d
//       .toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "numeric",
//         minute: "2-digit",
//         second: "2-digit",
//         dayPeriod: "long",
//       })
//       .split(",")

//     const stamp = {
//       date: `${dateString[0] + " " + dateString[1]}`,
//       time: dateString[2],
//     }

//     setCrosshairValue([{ x, y, stamp }])
//   }

//   /**
//    * to toggle showing tooltip for precise timestamp and LOC
//    */
//   const _mouseDown = () => {
//     setLastCrosshairValue({ ...crosshairValue, size: 10 })
//     setLastTimeStampValue(crosshairValue[0].stamp.time)
//     // setCrosshairVisible(!crosshairVisible)
//   }

//   return (
//     <XYPlot width={1200} height={600} onMouseDown={_mouseDown}>
//       <HorizontalGridLines />
//       <VerticalGridLines />
//       <YAxis title={yAxisTitle} left={600} />
//       {crosshairVisible === true ? (
//         <Crosshair values={crosshairValue}>
//           <div className="flex w-60  bg-white shadow-lg rounded-lg overflow-hidden">
//             <div
//               className={
//                 lastCrosshairValue[0].x === 0
//                   ? "w-2 bg-gray-500"
//                   : crosshairValue[0].y - lastCrosshairValue[0].y === 0
//                   ? "w-2 bg-gray-500"
//                   : crosshairValue[0].y - lastCrosshairValue[0].y >= 0
//                   ? "w-6 bg-green-500"
//                   : crosshairValue[0].y - lastCrosshairValue[0].y < 0
//                   ? "w-6 bg-red-500"
//                   : "w-2 bg-gray-500"
//               }
//             ></div>
//             <div className="flex items-center px-2 py-3">
//               <div className="mx-3">
//                 <h6 className="text-xl font-semibold text-gray-800">
//                   {crosshairValue[0]?.stamp?.time || "Move To View"}
//                 </h6>
//                 {crosshairValue[0]?.stamp?.date || "<date>"}
//                 <p className="text-gray-600">
//                   {yAxisTitle}
//                   {` `}
//                   <span href="#" className="text-blue-500">
//                     {crosshairValue[0].y}
//                   </span>
//                 </p>
//                 <p className="text-gray-600">
//                   Difference :{` `}
//                   <b>
//                     {lastTimeStampValue !== ""
//                       ? crosshairValue[0].y - lastCrosshairValue[0].y
//                       : "Click to calculate"}
//                   </b>
//                   <br />
//                   Since : {lastTimeStampValue || "Click to calculate"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Crosshair>
//       ) : (
//         true
//       )}
//       <XAxis
//         title="X Axis"
//         hideLine
//         tickTotal={10}
//         tickPadding={6}
//         tickFormat={(t, i) => {
//           const d = new Date(t)
//           return (
//             <tspan>
//               <tspan x="0" dy="1em">
//                 {d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()}
//               </tspan>
//               <tspan x="0" dy="1em">
//                 {d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()}
//               </tspan>
//             </tspan>
//           )
//         }}
//       />

//       <LineSeries
//         color="black"
//         animation="wobbly"
//         data={processedData}
//         onNearestX={_updateNearestValue}
//         opacity={0.5}
//         style={{ strokeLinejoin: "round" }}
//       />
//     </XYPlot>
//   )
// }
