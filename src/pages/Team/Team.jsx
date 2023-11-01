import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { getTeamDetailsById } from '../../script/team'
import { DeviceCard } from "../../components/DeviceCard";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Team() {
    const query = useQuery()
    const id = query.get("id")
    console.log("id", query.get("id"))
    const [teamDetails, setTeamDetails] = useState({
        friendlyName: "friendlyName",
        id: "id",
    })
    const [devices, setDevices] = useState([])

    useEffect(() => {
        console.log("🚀 ~ file: Team.jsx:26 ~ getTeamDetailsById ~ ̥:", id)
        getTeamDetailsById(id).then(details => {
            console.log(id, details)
            setTeamDetails({ friendlyName: details?.friendlyName, id: details.id })
            setDevices(details.devices)
        })
    }, [])

    return (
        <div className="pt-12">
            <h1 className="mb-6 text-3xl font-semibold tracking-tighter text-black sm:text-4xl ">
                {teamDetails.friendlyName}
            </h1>
            <section className="text-gray-700">
                <div className="container px-2">
                    <div className="flex flex-wrap text-center items-center flex-grow justify-center ">
                        {devices.map(device => (
                            <DeviceCard data={device} key={device.machineID} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}