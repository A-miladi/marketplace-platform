import * as yup from "yup";

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(30, "Name must be at most 30 characters long"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(120, "Description must be at most 120 characters long"),
});
