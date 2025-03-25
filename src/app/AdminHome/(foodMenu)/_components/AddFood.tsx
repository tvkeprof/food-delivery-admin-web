"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addFood, getCategories } from "@/app/utils/axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "@/app/utils/yup";
import axios from "axios";
import FoodCard from "./FoodCard";

const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
const NEXT_PUBLIC_CLOUDINARY_API_KEY = "996938878911193";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const FoodContainer = ({ categoryId }: { categoryId: string }) => {
  const [open, setOpen] = useState(false);
  const [imageData, setImageData] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");
  const [categories, setCategories] = useState<any[]>([]);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET || "");
    formData.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY || "");
    try {
      const response = await axios.post(API_URL, formData);
      return response.data.secure_url;
    } catch (err) {
      console.error("Error uploading image", err);
      return null;
    }
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageData(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFieldValue("image", file);
    }
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setSubmitting(true);
      const imageUrl = await uploadImageToCloudinary(imageData!);
      if (imageUrl) {
        await addFood({
          foodName: values.foodName,
          category: categoryId,
          price: values.price,
          image: imageUrl,
          ingredients: values.ingredients,
        });
        alert("Food added successfully");
        setSubmitting(false);
        setOpen(false);
      } else {
        alert("Error uploading image");
      }
    } catch (err) {
      console.log("Error while adding food", err);
      alert("Error while adding food");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex space-x-8">
      <div className="w-1/3">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="w-[270px] h-[240px] outline-2 outline-offset-2 outline-dashed flex items-center justify-center outline-red-500 rounded-lg flex-col">
              <button className="bg-red-500 rounded-full w-[32px] h-[32px] flex items-center justify-center text-white text-xl cursor-pointer">
                +
              </button>
              <p>Add new dish</p>
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
              {({ setFieldValue, isSubmitting }) => (
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                      className="border p-2 rounded w-full"
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Image preview"
                        className="mt-2 w-24 h-24 object-cover"
                      />
                    )}
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
                    disabled={isSubmitting}
                    className={`mt-4 px-4 py-2 rounded ${
                      isSubmitting
                        ? "bg-gray-400 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">🔄</span> Adding...
                      </>
                    ) : (
                      "Add Food"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
      <FoodCard categoryId={categoryId} />
    </div>
  );
};

export default FoodContainer;
