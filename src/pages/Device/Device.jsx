import React from "react";
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import Graph from "../../components/graph";
import { useChannel } from 'ably/react';

const styles = {
    active: "flex items-center px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg    2hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2",
    inactive: "flex items-center px-6 py-2 font-semibold text-black transition duration-500 ease-in-out transform border hover:border-black rounded-lg    2hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2",
}

const processData = (data, type) => {
    return data.filter(item => item.name === type).map(item => ({
        x: item.timestamp,
        y: parseInt(item.data)
    }));
}


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Device() {
    const query = useQuery()
    const deviceID = query.get("id");

    //states
    const [currentMode, setCurrentMode] = useState("snapshot")
    const [entropyData, setEntropyData] = useState([]);
    const [snapshotData, setSnapshotData] = useState([]);
    const [isHistorySet, setIsHistorySet] = useState(true);

    //get snapshot messages
    const { channel } = useChannel(`History_${deviceID}`, "snapshot", (message) => {
        if (isHistorySet == true) {
            setSnapshotData(prev => [...prev, { x: message.timestamp, y: parseInt(message.data) }]);
        }
    });

    //get entropy messages
    useChannel(`History_${deviceID}`, "entropy", (message) => {
        if (isHistorySet == true) {
            setEntropyData(prev => [...prev, { x: message.timestamp, y: parseInt(message.data) }]);
        }
    });

    //TODO: handle the case where there i no data coming and change isHistorySet accordingly
    channel.history(function (err, data) {
        if (isHistorySet === false) {
            setEntropyData(processData(data.items, "entropy"));
            setSnapshotData(processData(data.items, "snapshot"));
            setIsHistorySet(true);
        }
    });


    return (
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
            <div className="m-4">
                <Graph
                    yAxisTitle="Units"
                    data={currentMode === "snapshot" ? snapshotData : entropyData}
                />
            </div>
        </div>
    )
}