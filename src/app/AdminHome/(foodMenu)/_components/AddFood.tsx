"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addFood, getFoods, getCategories } from "@/app/utils/axios";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
  const fetchFoods = async () => {
    const data = await getFoods();
    if (data) setFoods(data);
  };
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const data = await getCategories();
    if (data) setCategory(data);
  };
  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex space-x-8">
        <div className="w-1/3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="w-[270px] h-[240px] outline-2 outline-offset-2 outline-dashed flex items-center justify-center outline-red-500 rounded-lg flex-col">
                <button className="bg-red-500 rounded-full w-[32px] h-[32px] flex items-center justify-center text-white text-xl cursor-pointer">
                  +
                </button>
                <p>Add new dish to{category.name}</p>
              </div>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Food</DialogTitle>
                <DialogDescription>
                  Enter the food details below.
                </DialogDescription>
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
        </div>

        {/* Food List Section */}
        <div className="flex-1">
          <ul className="grid grid-cols-2 gap-4">
            {Array.isArray(foods) && foods.length > 0 ? (
              foods.map((food) => (
                <li
                  key={food._id}
                  className="border p-4 rounded-lg bg-white shadow-lg"
                >
                  <p className="font-bold text-lg">{food.foodName}</p>
                  <p className="text-sm text-gray-500">${food.price}</p>
                  <img
                    src={food.image}
                    alt={food.foodName}
                    className="w-20 h-20 object-cover rounded-md mt-2"
                  />
                  <p className="mt-2 text-sm text-gray-700">
                    {food.ingredients}
                  </p>
                </li>
              ))
            ) : (
              <li>No foods found.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FoodContainer;
