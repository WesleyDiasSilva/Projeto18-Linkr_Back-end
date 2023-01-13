import Joi from "joi";

export const newCommentPost = Joi.object({
    post_id: Joi.number().required(),
    text: Joi.string().required()
});

