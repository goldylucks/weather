import React from "react"
import { Router } from "@reach/router"
import SearchTopBar from "./features/search/SearchTopBar"
import HomePage from "./pages/HomePage"
import CityPage from "./pages/CityPage"
import "./App.css"

function App() {
  return (
    <div className="app-container">
      <SearchTopBar />
      <Router>
        <HomePage path="/" />
        <CityPage path="/city/:cityId" />
      </Router>
    </div>
  )
}

export default App
