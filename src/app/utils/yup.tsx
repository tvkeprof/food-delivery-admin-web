"use client";

import * as Yup from "yup";

export const validationSchema = Yup.object({
  foodName: Yup.string().required("Food name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(0.01, "Price must be at least $0.01"),
  //   image: Yup.string().required("Image URL is required"),
  ingredients: Yup.string().required("Ingredients are required"),
});
