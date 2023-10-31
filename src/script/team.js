import axios from "axios"
import { server } from "./config"

const getTeamDetailsById = async id => {
  console.log("server.api",`${server.api}/team/${id}`)
  const result = await axios.get(`${server.api}/team/${id}`)
  console.log("result", result)
  const { data } = result
  console.log("data", data)
  return data.payload
}

export { getTeamDetailsById }
