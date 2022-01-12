import React, { useContext, useEffect, useRef, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { Plus } from "react-bootstrap-icons"
import { TodosContext } from "../../../../context/TodosContext"
import TodoValidator from "../../../../validator/Todo"

const initialValues = {
  title: "",
  description: "",
}

export function ModifyTodo() {
  const [values, setValues] = useState(initialValues)
  const [errorMessage, setErrorMessage] = useState("")

  const [loading, setLoading] = useState(false)

  const { modalShow, handleModalClose, addTodo, updateTodo, selectedTodo } =
    useContext(TodosContext)
  // const selectedTodoRef = useRef(selectedTodo)

  useEffect(() => {
    setErrorMessage("")

    setValues({
      ...values,
      ...selectedTodo,
    })
  }, [selectedTodo])

  const onChangeValue = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const clearValues = () => {
    setValues(initialValues)
  }

  const handleModifyTodo = (e) => {
    e.preventDefault()
    setLoading(true)

    const { title, description } = values
    const result = TodoValidator.validateAddTodoPayload({ title, description })

    if (result.error) {
      setErrorMessage(result.message)
      setLoading(false)
      return
    }

    if (selectedTodo.title) {
      updateTodo(selectedTodo.id, values)
    } else {
      addTodo(values)
    }

    clearValues()
    handleModalClose()

    setLoading(false)
  }

  const feedbackErrorElement = (field) =>
    errorMessage !== "" ? (
      <div className="text-danger my-2">{errorMessage.includes(field) ? errorMessage : null}</div>
    ) : null

  return (
    <div>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTodo.title === "" ? "Generate new todo" : "Update existing todo"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="email"
                placeholder="'make api' with custome implementation"
                value={values.title}
                onChange={onChangeValue}
              />
              {feedbackErrorElement("title")}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={5}
                value={values.description}
                onChange={onChangeValue}
              />
              {feedbackErrorElement("description")}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModifyTodo} disabled={loading}>
            {loading ? (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
