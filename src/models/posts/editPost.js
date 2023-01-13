import Joi from "joi";

export const editPost = Joi.object({
  post_id: Joi.number().required(),
  description: Joi.string().allow('')
})