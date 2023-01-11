import joi from "joi";

export const SignUpSchema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref("password"),
    picture_url: joi.string()
});