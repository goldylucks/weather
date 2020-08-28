import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import store from "./app/store"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"

store.subscribe(() => {
  const serializedState = JSON.stringify(store.getState())
  localStorage.setItem("weather-app", serializedState)
})

const render = (Component) => {
  return ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  )
}

render(App)

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default
    render(NextApp)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
