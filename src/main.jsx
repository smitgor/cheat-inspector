import React from 'react'
import ReactDOM from 'react-dom/client'
import { Realtime } from 'ably';
import { AblyProvider } from 'ably/react';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import Layout from './components/Layout.jsx'
import Team from './pages/Team/Team.jsx'
import Device from './pages/Device/Device.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path="/team" element={<Team />} />
      <Route path="/device" element={<Device />} />
    </Route>
  )
)

const client = new Realtime({
  key: "wUARoQ.XPGFtw:nPMKzrv2yfaVGYjMuhqogEfSNgDhf7_5xUv713k5zsU",
  clientId: "ajsbhjahbfjhaiunihu",  
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AblyProvider client={client}>
      <RouterProvider router={router} />
    </AblyProvider>
  </React.StrictMode>,
)
