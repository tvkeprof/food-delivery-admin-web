"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addFood } from "@/app/utils/axios";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const FoodContainer = ({ categoryId }: { categoryId: string }) => {
  const [open, setOpen] = useState(false);

  const validationSchema = Yup.object({
    foodName: Yup.string().required("Food name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .min(0.01, "Price must be at least $0.01"),
    image: Yup.string()
      .url("Invalid image URL")
      .required("Image URL is required"),
    ingredients: Yup.string().required("Ingredients are required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      await addFood({
        foodName: values.foodName,
        category: categoryId,
        price: values.price,
        image: values.image,
        ingredients: values.ingredients,
      });

      alert("Food added successfully");
      setOpen(false);
    } catch (err) {
      console.log("Error while adding food", err);
      alert("Error while adding food");
    }
  };
  const [foods, setFoods] = useState<any[]>([]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-red-500 rounded-full w-[32px] h-[32px] flex items-center justify-center text-white text-xl cursor-pointer">
            +
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Food</DialogTitle>
            <DialogDescription>Enter the food details below.</DialogDescription>
          </DialogHeader>

          <Formik
            initialValues={{
              foodName: "",
              price: 0,
              image: "",
              ingredients: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                {/* Food Name */}
                <div className="mb-4">
                  <Field
                    type="text"
                    name="foodName"
                    placeholder="Food Name"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="foodName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Price */}
                <div className="mb-4">
                  <Field
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Image URL */}
                <div className="mb-4">
                  <Field
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <Field
                    as="textarea"
                    name="ingredients"
                    placeholder="Ingredients"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="ingredients"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Food
                </button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Food List</h2>
        <ul>
          {foods.map((food) => (
            <li key={food._id} className="p-2 border-b">
              <p>{food.foodName}</p>
              <p>${food.price}</p>
              <img
                src={food.image}
                alt={food.foodName}
                className="w-20 h-20 object-cover"
              />
              <p>{food.ingredients}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodContainer;
