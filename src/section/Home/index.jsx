import React, { useContext } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Plus } from "react-bootstrap-icons"
import { TodosContext } from "../../context/TodosContext"
import { ModifyTodo, Todos } from "./components"

export function Home() {
  const { handleModalShow, setSelectedTodo } = useContext(TodosContext)
  const openModalAddTodo = () => {
    setSelectedTodo({
      title: "",
      description: "",
    })
    handleModalShow()
  }
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <div className="header my-4">
            <div className="text-center">
              <h1>Todo List App</h1>
              <p>Generate your todo list here for your daily tasks.</p>

              <Button type="button" onClick={openModalAddTodo}>
                <Plus /> Add Todo
              </Button>
            </div>
          </div>
          <Todos />
        </Col>
      </Row>
      <ModifyTodo />
    </div>
  )
}
