import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
  })
  .required();

export const signupSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
