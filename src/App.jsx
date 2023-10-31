import { useState } from 'react'
import {Link} from 'react-router-dom'
import './App.css'

function App() {
  const [teamID, setTeamID] = useState("")
  const formHandler = e => {
    e.preventDefault()
    console.log("processing.form", teamID)
  } 

  return (
    <div>
      <section className="text-gray-700 body-font">
        <div className="container flex flex-col px-5 py-8 mx-auto lg:items-center">
          <div className="flex flex-col w-full mb-8 text-left lg:text-center">
            <h2 className="mb-1 mt-12 pt-6 text-xs font-semibold tracking-widest text-black uppercase title-font">
              a leveled playing field for all
            </h2>
            <h1 className="mb-6 text-2xl font-semibold tracking-tighter text-black sm:text-6xl title-font">
              Hentry Dashboard
            </h1>
            <p className="mx-auto text-base font-medium leading-relaxed text-gray-700 lg:w-2/3"></p>
            <form onSubmit={formHandler} autoComplete="off">
              <div className="flex items-start w-full mt-12 lg:mx-auto lg:justify-center lg:w-1/2">
                <div className="relative w-2/4 mr-4 text-left lg:w-full xl:w-1/2 md:w-full">
                  <input
                    type="text"
                    id="hero-field"
                    name="hero-field"
                    placeholder="my-team-id"
                    autoComplete="off"
                    onChange={e => {
                      setTeamID(e.currentTarget.value)
                    }}
                    className="flex-grow w-full px-4 py-2 mb-4 mr-4 text-base text-black transition duration-1000 ease-in-out transform bg-gray-200 rounded-lg focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  />
                </div>
                <Link to={`/team?id=${teamID}`}>
                  <button className="flex items-center px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                    Go !
                  </button>
                </Link>
              </div>
            </form>
            <p className="mt-6 mb-8 text-sm text-gray-600 lg:mx-auto lg:w-1/3 ">
              Enter the team id to view details about them
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
