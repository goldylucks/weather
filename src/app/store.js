import { configureStore } from "@reduxjs/toolkit"
import reducer from "./rootReducer"

const options = {
  reducer,
}

let preloadedState = localStorage.getItem("weather-app")
if (preloadedState) {
  preloadedState = JSON.parse(preloadedState)
  options.preloadedState = preloadedState
}

const store = configureStore(options)

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const newRootReducer = require("./rootReducer").default
      store.replaceReducer(newRootReducer)
    })
  }
}

export default store
