import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import App from "./App"
import { TodosContextProvider } from "./context/TodosContext"

ReactDOM.render(
  <React.StrictMode>
    <TodosContextProvider>
      <App />
    </TodosContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
