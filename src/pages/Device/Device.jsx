import React from "react";
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import {
    getDeviceTimeSeriesById,
    pollDeviceTimeSeriesUpdatesById,
  } from "../../script/device";
// import Graph from "../../components/chart";



function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Device() {
    const query = useQuery()
    const deviceID = query.get("id");
    // const [deviceID] = useQueryParam("id", StringParam)
    const [currentMode, setCurrentMode] = useState("snapshot")

    /** store time series data into these variables */
    const [entropy, setEntropy] = useState([])
    const [snapshot, setSnapshot] = useState([])

    let lastEntropyTimeStamp = 0
    let lastSnapShotTimeStamp = 0

    useEffect(() => {
        /** load device snapshot */
        getDeviceTimeSeriesById("snapshot", deviceID)
        .then(data => {
            const processedData = []
            for (let i = 0; i < data.length; i++) {
            processedData.push({
                x: parseInt(data[i][0]),
                y: parseInt(data[i][1]),
            })
            lastSnapShotTimeStamp = data[i][0]
            }
            setSnapshot(processedData)
        })
        .catch(error => {
            alert("Error fetching snapshot data" + error)
        })

        /** load device entropy */
        getDeviceTimeSeriesById("entropy", deviceID)
        .then(data => {
            const processedData = []
            for (let i = 0; i < data.length; i++) {
            processedData.push({
                x: parseInt(data[i][0]),
                y: parseInt(data[i][1]),
            })
            lastEntropyTimeStamp = data[i][0]
            }
            setEntropy(processedData)
        })
        .catch(error => {
            alert("Error fetching snapshot data" + error)
        })
    }, [])

  /** polling service to automatically update graph every 10 seconds */
  setInterval(() => {
    if (lastEntropyTimeStamp === 0) {
      return
    }

    pollDeviceTimeSeriesUpdatesById(
      "snapshot",
      deviceID,
      lastSnapShotTimeStamp
    ).then(data => {
      const processedData = []
      for (let i = 0; i < data.length; i++) {
        processedData.push({
          x: parseInt(data[i][0]),
          y: parseInt(data[i][1]),
        })
        lastSnapShotTimeStamp = data[i][0]
      }
      setSnapshot(oldSnapshots => [...oldSnapshots, ...processedData])
    })

    pollDeviceTimeSeriesUpdatesById(
      "entropy",
      deviceID,
      lastEntropyTimeStamp
    ).then(data => {
      const processedData = []
      for (let i = 0; i < data.length; i++) {
        processedData.push({
          x: parseInt(data[i][0]),
          y: parseInt(data[i][1]),
        })
        lastEntropyTimeStamp = data[i][0]
      }
      setEntropy(oldEntropy => [...oldEntropy, ...processedData])
    })

    console.log("ticker")
  }, 1 * 1000)               
    const styles = {
        active:"flex items-center px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg    2hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2",
        inactive:"flex items-center px-6 py-2 font-semibold text-black transition duration-500 ease-in-out transform border hover:border-black rounded-lg    2hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2",
    }
    

    return(
        <div>
            <div className="flex items-start w-full mt-6 lg:mx-auto lg:justify-center lg:w-1/2">
            <div className="mr-2">
                <button
                className={
                    currentMode === "snapshot" ? styles.active : styles.inactive
                }
                onClick={() => {
                    setCurrentMode("snapshot")
                }}
                >
                View Snapshot
                </button>
            </div>
            <div className="ml-2">
                <button
                className={
                    currentMode === "entropy" ? styles.active : styles.inactive
                }
                onClick={() => {
                    setCurrentMode("entropy")
                }}
                >
                View Entropy
                </button>
            </div>
        </div>
            {/* <TimeGraph snapshot={snapshot} entropy={entropy} /> */}
        <div className="m-4">
            {/* <Graph
                yAxisTitle="Units"
                data={currentMode === "snapshot" ? snapshot : entropy}
            /> */}
        </div>
        <div className="m-4">
            {/* <Graphs yAxisTitle="Entropy (changes)" data={entropy} /> */}
        </div>
        </div>
    )
}