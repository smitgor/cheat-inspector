import axios from "axios"
import { server } from "./config"

const getDeviceTimeSeriesById = async (category, id) => {
  // http://localhost:8000/timeseries/8e62cc02ec0e46e991b3d67f73aadd81
  const result = await axios.get(
    `${server.api}/timeseries/${category}/${id}/now`
  )
  const { data } = await result
  return data.payload
}

const pollDeviceTimeSeriesUpdatesById = async (category, id, from) => {
  const result = await axios.get(
    `${server.api}/timeseries/${category}/poll/${id}/${from}`
  )
  const { data } = await result
  return data.payload
}

export { getDeviceTimeSeriesById, pollDeviceTimeSeriesUpdatesById }
