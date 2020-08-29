import React, { useState } from "react"
import { Router } from "@reach/router"
import cx from "classnames"

import SearchTopBar from "./features/search/SearchTopBar"
import HomePage from "./pages/HomePage"
import CityPage from "./pages/CityPage"
import UserLocationPage from "./pages/UserLocationPage"
import SearchResultsModalForInnerPages from "./components/SearchResultsModalForInnerPages"
import "./App.css"
import OfflineBar from "./components/OfflineBar/OfflineBar"
import useIsOnline from "./hooks/useIsOnline"

function App() {
  const isOnline = useIsOnline()
  return (
    <div className={cx("app-container", { "is-offline": !isOnline })}>
      <SearchTopBar />
      <Router>
        <HomePage path="/" />
        <CityPage path="/city/:cityId" />
        <UserLocationPage path="/user-location" />
      </Router>
      <SearchResultsModalForInnerPages />
      <OfflineBar />
    </div>
  )
}

export default App
