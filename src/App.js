import React, { useState } from "react"
import { Router } from "@reach/router"
import SearchTopBar from "./features/search/SearchTopBar"
import HomePage from "./pages/HomePage"
import CityPage from "./pages/CityPage"
import UserLocationPage from "./pages/UserLocationPage"
import SearchResultsModalForInnerPages from "./components/SearchResultsModalForInnerPages"
import "./App.css"

function App() {
  const [isTopbarMounted, setIsTopbarMounted] = useState(false)
  return (
    <div className="app-container">
      <SearchTopBar onMount={() => setIsTopbarMounted(true)} />
      <Router>
        <HomePage path="/" isTopbarMounted={isTopbarMounted} />
        <CityPage path="/city/:cityId" />
        <UserLocationPage path="/user-location" />
      </Router>
      <SearchResultsModalForInnerPages />
    </div>
  )
}

export default App
