import React from "react";
import {Link, useLocation} from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Header(){
  const query = useQuery()
    const {pathname} = useLocation();
    let name = '';
    if(pathname==='/team') name = 'Team Id: '
    else if(pathname==='/device') name = 'Device Id: ';
    return (
        <div>
        <div className="text-gray-700 bg-white ">
          <div className="flex flex-col flex-wrap p-5 mx-auto border-b md:items-center md:flex-row">
            <div className="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
              <div className="inline-flex items-center">
                <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-cyan-400 to-lightBlue-500"></div>
                <Link style={{ textDecoration: "none", color: "white" }} to="/">
                  <h2 className="font-semibold text-2xl tracking-tighter text-gray-500 transition duration-1000 ease-in-out transform text-bold lg:mr-8">
                    CheatInspector
                  </h2>
                </Link>
              </div>
            </div>
  
            {query.get("id") ? (
              <button className="items-center px-8 py-2 ml-auto font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-900 focus:ring focus:outline-none">
                {name} {query.get("id")}
              </button>
            ) : (
              true
            )}
          </div>
        </div>
      </div>
    )
}