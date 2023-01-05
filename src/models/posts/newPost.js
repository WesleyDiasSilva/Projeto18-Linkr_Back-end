import Joi from "joi";

export const newPost = Joi.object({
  link: Joi.string().required(),
  description: Joi.string()
})