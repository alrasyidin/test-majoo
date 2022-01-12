import Joi from "joi"

export const TodoSchema = Joi.object(
  {
    title: Joi.string().required(),
    description: Joi.string().required(),
  },
  {
    strict: true,
  }
)
