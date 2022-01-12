import React, { useContext } from "react"
import { CheckLg, ArrowClockwise } from "react-bootstrap-icons"
import { Button, Card, Col, Row } from "react-bootstrap"

import { TodosContext } from "../../../../context/TodosContext"
import { formatDate } from "../../../../utils"

export function Todo({ todo }) {
  const { id, title, status, description, createdAt } = todo
  const { deleteTodo, setSelectedTodo, handleModalShow, updateStatus } = useContext(TodosContext)

  const handleDeleteTodo = (idTodo) => {
    if (window.confirm("Are you sure to delete this todo?")) {
      deleteTodo(idTodo)
    }
  }

  const handleEditTodo = () => {
    setSelectedTodo(todo)
    handleModalShow()
  }

  const handleChangeStatus = (idTodo, statusTodo) => {
    updateStatus(idTodo, statusTodo)
  }

  const btnActionElement = () => (
    <>
      {status === 0 ? (
        <Button
          className="me-3"
          type="button"
          variant="light"
          onClick={() => handleChangeStatus(id, 1)}
        >
          <CheckLg color="black" />
        </Button>
      ) : null}

      {status === 1 ? (
        <Button
          className="me-3"
          type="button"
          variant="light"
          onClick={() => handleChangeStatus(id, 0)}
        >
          <ArrowClockwise color="black" />
        </Button>
      ) : null}

      <Button className="me-3" type="button" variant="warning" onClick={handleEditTodo}>
        Edit
      </Button>

      {status === 0 ? (
        <Button type="button" variant="danger" onClick={() => handleDeleteTodo(id)}>
          Delete
        </Button>
      ) : null}
    </>
  )

  return (
    <Card className="todo my-4" bg="light" text="dark">
      <Card.Header>
        <Row>
          <Col>{title}</Col>
          <Col className="text-end">{btnActionElement()}</Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text className="text-end">{formatDate(createdAt)} ago</Card.Text>
      </Card.Body>
    </Card>
  )
}
