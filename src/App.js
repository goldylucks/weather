import React from "react"
import { Router, Location } from "@reach/router"
import cx from "classnames"
import { TransitionGroup, CSSTransition } from "react-transition-group"

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
      <Location>
        {({ location }) => (
          <TransitionGroup className="transition-group">
            <CSSTransition key={location.key} timeout={150} classNames="fade">
              <Router location={location} className="router">
                <HomePage path="/" className="page" />
                <CityPage path="/city/:cityId" className="page" />
                <UserLocationPage path="/user-location" className="page" />
              </Router>
            </CSSTransition>
          </TransitionGroup>
        )}
      </Location>
      <SearchResultsModalForInnerPages />
      <OfflineBar />
    </div>
  )
}

export default App
