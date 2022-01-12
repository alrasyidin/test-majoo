import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Route, Switch } from "react-router-dom"
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min"
import { Home } from "./section/Home"

function App() {
  return (
    <Container fluid="md">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

export default App
