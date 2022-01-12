import React, { useContext, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { TodosContext } from "../../../../context/TodosContext"
import { API } from "../../../../config/api"
import { Todo } from "../Todo"

export function Todos(props) {
  const { todos, setTodos } = useContext(TodosContext)

  useEffect(() => {
    const fetchTodosData = async () => {
      try {
        const response = await API.get("/to-do-list")
        setTodos(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTodosData()
  }, [])

  const todosElement = (status) =>
    todos.length > 0 ? (
      todos
        .filter((todo) => todo.status === status)
        .sort((prev, next) => {
          const a = new Date(prev.createdAt)
          const b = new Date(next.createdAt)
          if (status === 0) return b - a
          if (status === 1) return a - b

          return 0
        })
        .map((todo) => <Todo todo={todo} key={todo.id} />)
    ) : (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )

  return (
    <div className="body my-5">
      <div className="todos">
        <div className="pending">
          <h3>Pending Todos</h3>
          {todosElement(0)}
        </div>
        <div className="complete">
          <h3>Completes Todos</h3>
          {todosElement(1)}
        </div>
      </div>
    </div>
  )
}
