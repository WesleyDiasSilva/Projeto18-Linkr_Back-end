import Joi from "joi";

export const newPost = Joi.object({
  link: Joi.string().uri().required(),
  description: Joi.string().allow('')
})