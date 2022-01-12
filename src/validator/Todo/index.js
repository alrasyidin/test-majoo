import { ValidationError } from "joi"
import { TodoSchema } from "./schema"

const TodoValidator = {
  validateAddTodoPayload: (payload) => {
    const validation = TodoSchema.validate(payload)
    let data = {}
    if (validation.error) {
      data = {
        error: true,
        message: validation.error.message,
      }
    } else {
      data = {
        error: false,
      }
    }

    return data
  },
}

export default TodoValidator
