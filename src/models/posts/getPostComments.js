import Joi from "joi";

export const getPostComments = Joi.object({
    post_id: Joi.string().pattern(/^[0-9]+$/).required()
});