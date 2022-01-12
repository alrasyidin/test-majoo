import React, { createContext, useMemo, useState } from "react"

export const TodosContext = createContext()

export function TodosContextProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState({})
  const [modalShow, setModalShow] = useState(false)

  const handleModalClose = () => setModalShow(false)
  const handleModalShow = () => setModalShow(true)

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        ...todo,
        id: todos.length + 1,
        status: 0,
        createdAt: new Date(),
      },
    ])
  }

  const deleteTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const updateTodo = (id, todo) => {
    const todosCopy = [...todos]
    if (todosCopy[id]) {
      todosCopy[id].title = todo.title
      todosCopy[id].description = todo.description
      todosCopy[id].createdAt = new Date()
    }

    setTodos([...todosCopy])
  }

  const updateStatus = (id, status) => {
    const todosCopy = [...todos]
    const idx = todosCopy.findIndex((t) => t.id === id)

    if (todosCopy[idx]) {
      todosCopy[idx].status = status
    }

    setTodos([...todosCopy])
  }

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      addTodo,
      selectedTodo,
      setSelectedTodo,
      deleteTodo,
      updateTodo,
      updateStatus,
      modalShow,
      handleModalClose,
      handleModalShow,
    }),
    [todos, selectedTodo, modalShow]
  )

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}
