import Joi from "joi";

export const likePost = Joi.object({
    post_id: Joi.number().required(),
    user_id: Joi.number().required()
});