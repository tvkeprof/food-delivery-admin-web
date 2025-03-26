// "use client";

// import { useEffect, useState } from "react";
// import { getCategories, addCategory } from "@/app/utils/axios";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");

//   const fetchCategories = async () => {
//     const data = await getCategories();
//     if (data) setCategories(data);
//   };

//   //   const handleAddCategory = async () => {
//   //     if (!newCategory) return;
//   //     await addCategory({ name: newCategory });
//   //     setNewCategory("");
//   //     fetchCategories();
//   //   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   console.log(categories);

//   return (
//     <div className="">
//       <div>
//         <p>Profile picture here</p>
//       </div>
//       <div className="bg-[#FFFFFF] rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">Categories</h2>

//         <div className="flex gap-4 flex-wrap">
//           {categories.map((category: any) => (
//             <div
//               key={category._id}
//               className="bg-amber-200  w-[135px] h-[36px] rounded-full flex items-center justify-center text-center"
//             >
//               {category.categoryName}
//             </div>
//           ))}
//           <Dialog>
//             <DialogTrigger asChild>
//               <button className="bg-red-500 rounded-full w-[32px] h-[32px] flex items-center justify-center text-white cursor-pointer">
//                 +
//               </button>
//             </DialogTrigger>

//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add New Category</DialogTitle>
//                 <DialogDescription>
//                   Enter a name and click Add
//                 </DialogDescription>
//               </DialogHeader>

//               {/* Input for category name */}
//               <input
//                 type="text"
//                 placeholder="Category name"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 className="border rounded p-2 w-full mt-4"
//               />

//               {/* Add Button */}
//               <button
//                 onClick={async () => {
//                   if (!newCategory.trim()) {
//                     alert("Please enter a category name.");
//                     return;
//                   }
//                   try {
//                     await addCategory({ categoryName: newCategory });
//                     setNewCategory(""); // Clear input
//                     fetchCategories(); // Refetch list
//                   } catch (err) {
//                     console.error("Failed to add category:", err);
//                     alert("Couldn't add category");
//                   }
//                 }}
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Add
//               </button>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { addFood } from "@/app/utils/axios";
// import { useState } from "react";

// const FoodContainer = ({ categoryId }: { categoryId: string }) => {
//   const [foodName, setFoodName] = useState("");

//   const handleAddFood = async () => {
//     if (!foodName.trim()) {
//       alert("Please enter food name");
//       return;
//     }

//     try {
//       await addFood({
//         foodName,
//         category: categoryId,
//         price: 0,
//         image: "",
//         ingredients: "",
//       });
//       setFoodName("");
//       alert("Food added successfully");
//     } catch (err) {
//       console.log("Error while adding food", err);
//       alert("Error while adding food");
//     }
//   };

//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger asChild>
//           <button className="bg-red-500 rounded-full w-[32px] h-[32px] flex items-center justify-center text-white text-xl cursor-pointer">
//             +
//           </button>
//         </DialogTrigger>

//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Food</DialogTitle>
//             <DialogDescription>Enter the food name below.</DialogDescription>
//           </DialogHeader>

//           <input
//             type="text"
//             placeholder="Food name"
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             className="border p-2 rounded w-full mt-4"
//           />

//           <button
//             onClick={handleAddFood}
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default FoodContainer;

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ChangeEvent, useEffect, useState } from "react";
// import axios from "axios";
// import { useFormik } from "formik";
// import { foodSchema } from "@/utils/foodSchema";
// import * as yup from "yup";

// type FoodInfoTypes = {
//   _id: string;
//   foodName: string;
//   ingredients: string;
//   price: string;
//   image: string;
//   category: string;
// };
// type CategoryTypes = {
//   _id: string;
//   categoryName: string;
//   numbers: number;
// };

// export const FoodMenu = () => {
//   const [getDataFoods, setGetDataFoods] = useState<FoodInfoTypes[]>([]);
//   const [imageData, setImageData] = useState<File | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | undefined>();
//   const [getCategory, setGetCategory] = useState<CategoryTypes[]>([]);

//   const formik = useFormik({
//     initialValues: {
//       foodName: "",
//       ingredients: "",
//       price: "",
//       image: "",
//       category: "",
//     },
//     validationSchema: foodSchema,
//     onSubmit: async (values) => {
//       const uploadedImageUrl = await uploadImageToCloudinary();

//       if (!uploadedImageUrl) {
//         alert("Image upload failed, please try again.");
//         return;
//       }

//       try {
//         const response = await axios.post("http://localhost:4000/foods", {
//           ...values,
//           image: uploadedImageUrl,
//           category: values.category,
//         });
//         console.log(uploadedImageUrl);

//         console.log("Food item added:", response.data);
//         fetchData();
//       } catch (error) {
//         console.error("Error adding food item:", error);
//       }
//     },
//   });

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImageData(file);
//     formik.setFieldValue("image", file);
//     const reader = new FileReader();
//     reader.onload = () => setPreviewImage(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   const uploadImageToCloudinary = async () => {
//     if (!imageData) {
//       alert("Please select an image.");
//       return null;
//     }

//     const formData = new FormData();
//     formData.append("file", imageData);
//     formData.append(
//       "upload_preset",
//       process.env.CLOUDINARY_UPLOAD_PRESET || ""
//     );
//     formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_APIKEY || "");

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log(response);

//       return response.data.secure_url;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return null;
//     }
//   };

// const deleteFood = async (foodId: string) => {
//   try {
//     const response = await axios.delete(
//       `http://localhost:4000/foods/${foodId}`
//     );
//     console.log("Food item deleted:", response.data);
//     fetchData();
//   } catch (error) {
//     console.error("Error deleting food item:", error);
//   }
// };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/foods");
//       setGetDataFoods(response.data);
//     } catch (error) {
//       console.error("Error fetching food data:", error);
//     }
//   };

//   const categoryFormik = useFormik({
//     initialValues: {
//       categoryName: "",
//     },
//     validationSchema: yup.object({
//       categoryName: yup.string().required("Category name is required"),
//     }),
//     onSubmit: async (values) => {
//       console.log(values);

//       try {
//         const response = await axios.post("http://localhost:4000/category", {
//           categoryName: values.categoryName,
//         });
//         console.log("Category added:", response.data);
//         setGetCategory((prev) => [...prev, response.data]);
//       } catch (error) {
//         console.error("Error adding category:", error);
//       }
//     },
//   });

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/category");
//       const categories = response.data;

//       const updatedCategories = categories.map((category: CategoryTypes) => {
//         const dishCount = getDataFoods.filter(
//           (food) => food.category === category._id
//         ).length;

//         console.log(dishCount);

//         return { ...category, numbers: dishCount };
//       });

//       setGetCategory(updatedCategories);
//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchCategories();
//   }, []);

//   return (
//     <>
//       <div className="w-full max-w-7xl mx-auto py-8 px-4">
//         <h2 className="text-4xl font-bold text-gray-900">Dishes Category</h2>
//         <div className="flex flex-wrap gap-4 p-6">
//           {getCategory.map((el, index) => (
//             <button
//               className={`flex items-center gap-2 rounded-3xl px-4 py-2 border ${
//                 el.categoryName === "All Dishes"
//                   ? "border-red-500 text-black"
//                   : "border-gray-300 text-black hover:bg-gray-100"
//               }`}
//               key={index}
//             >
//               <span>{el.categoryName}</span>
//               <span className="bg-black text-white text-sm font-medium px-2 py-1 rounded-full">
//                 {el.numbers}
//               </span>
//             </button>
//           ))}
//         </div>

//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//               className="bg-red-500 text-white text-2xl rounded-[100%]"
//               variant="outline"
//             >
//               +
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Add new category</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={categoryFormik.handleSubmit}>
//               <div className="gap-4 py-4">
//                 <div className=" grid-cols-4 items-center gap-4">
//                   <Label
//                     htmlFor="categoryName"
//                     className="text-right text-lg font-inter font-medium text-[14px] leading-[14px] tracking-[-0.02em]"
//                   >
//                     Category Name
//                   </Label>
//                   <Input
//                     id="categoryName"
//                     name="categoryName"
//                     value={categoryFormik.values.categoryName}
//                     onChange={categoryFormik.handleChange}
//                     className="col-span-3"
//                     placeholder="Type category name..."
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="submit">Save changes</Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//       {getCategory.map((el) => (
//         <div key={el._id} className=" flexl p-4 space-y-6">
//           <div className="w-full max-w-[270px] mx-auto h-[241px] border border-gray-300 rounded-[20px] p-[16px] shadow-md hover:shadow-lg transition-shadow duration-300">
//             <p className="text-center font-semibold text-lg text-gray-700">
//               {el.categoryName}
//             </p>

//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="m-auto flex items-center justify-center w-12 h-12 border-2 border-gray-200 rounded-lg p-4 shadow-lg hover:bg-indigo-100 transition-all duration-200"
//                 >
//                   +
//                 </Button>
//               </DialogTrigger>

//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Enter Food Details</DialogTitle>
//                   <DialogDescription>
//                     Fill in the food details here. Click save when you're done.
//                   </DialogDescription>
//                 </DialogHeader>

//                 <form onSubmit={formik.handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="foodName" className="text-right">
//                       Dish Name
//                     </Label>
//                     <Input
//                       id="foodName"
//                       {...formik.getFieldProps("foodName")}
//                       className="col-span-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
//                     />
//                     {formik.touched.foodName && formik.errors.foodName && (
//                       <div className="col-span-3 text-red-500 text-sm mt-1">
//                         {formik.errors.foodName}
//                       </div>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="category" className="text-right">
//                       Category
//                     </Label>
//                     <select
//                       id="category"
//                       {...formik.getFieldProps("category")}
//                       className="col-span-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
//                     >
//                       <option value="">Select a category</option>
//                       {getCategory.map((category) => (
//                         <option key={category._id} value={category._id}>
//                           {category.categoryName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="ingredients" className="text-right">
//                       Ingredients
//                     </Label>
//                     <Input
//                       id="ingredients"
//                       {...formik.getFieldProps("ingredients")}
//                       className="col-span-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
//                     />
//                   </div>

//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="price" className="text-right">
//                       Price
//                     </Label>
//                     <Input
//                       id="price"
//                       type="number"
//                       {...formik.getFieldProps("price")}
//                       className="col-span-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
//                     />
//                   </div>

//                   <div className="grid grid-cols-3 items-center gap-4">
//                     <Label htmlFor="image" className="text-right">
//                       Upload Image
//                     </Label>
//                     <div className="col-span-3">
//                       <input
//                         type="file"
//                         id="image"
//                         onChange={handleFileChange}
//                         className="border border-gray-300 rounded-lg py-2 px-4"
//                       />
//                       {previewImage && (
//                         <img
//                           src={previewImage}
//                           alt="Preview"
//                           className="mt-4 rounded-lg w-32 h-32 object-cover"
//                         />
//                       )}
//                     </div>
//                   </div>

//                   <DialogFooter>
//                     <Button
//                       type="submit"
//                       disabled={formik.isSubmitting}
//                       className="bg-indigo-600 text-white rounded-lg py-3 px-8 mt-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
//                     >
//                       {formik.isSubmitting ? "Submitting..." : "Add Dish"}
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {getDataFoods
//               .filter((food) => food.category === el._id)
//               .map((food) => (
//                 <div
//                   key={food._id}
//                   className="border-2 border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <div className="relative">
//                     <button
//                       onClick={() => deleteFood(food._id)}
//                       className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
//                     >
//                       ❌
//                     </button>
//                     <img
//                       src={food.image}
//                       alt={food.foodName}
//                       className="w-full h-48 object-cover rounded-lg"
//                     />
//                   </div>
//                   <h3 className="text-2xl font-semibold text-gray-800 mt-4">
//                     {food.foodName}
//                   </h3>
//                   <p className="text-gray-600 mt-2">{food.ingredients}</p>
//                   <p className="text-gray-800 font-bold mt-4">${food.price}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default FoodMenu;

// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { addFood, getFoods, getCategories } from "@/app/utils/axios";
// import { ChangeEvent, useEffect, useState } from "react";
// import { Formik, Field, Form, ErrorMessage, useField } from "formik";
// import { validationSchema } from "@/app/utils/yup";
// import axios from "axios";

// const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
// const NEXT_PUBLIC_CLOUDINARY_API_KEY = "996938878911193";
// const CLOUDINARY_UPLOAD_PRESET = "ml_default";
// const API_URL = `POST https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// const FoodContainer = ({ categoryId }: { categoryId: string }) => {
//   const [open, setOpen] = useState(false);

//   const handleSubmit = async (values: any) => {
//     const uploadedImageUrl = await uploadImageToCloudinary();
//     if (!uploadedImageUrl) {
//       alert("image upload failed");
//       return;
//     }
//     try {
//       await addFood({
//         foodName: values.foodName,
//         category: categoryId,
//         price: values.price,
//         image: uploadedImageUrl,
//         ingredients: values.ingredients,
//       });

//       alert("Food added successfully");
//       setOpen(false);
//     } catch (err) {
//       console.log("Error while adding food", err);
//       alert("Error while adding food");
//     }
//   };
//   const [foods, setFoods] = useState<any[]>([]);
//   const [imageData, setImageData] = useState<File | null>();
//   const [previewImage, setPreviewImage] = useState<string | undefined>();
//   const uploadImageToCloudinary = async () => {
//     if (!imageData) {
//       alert("please select an image");
//       return null;
//     }
//     const formData = new FormData();
//     formData.append("file", imageData);
//     formData.append("upload preset", CLOUDINARY_UPLOAD_PRESET || "");
//     formData.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY || "");
//     try {
//       const response = await axios.post(API_URL, formData);
//       console.log(response);
//       return response.data.secure_url;
//     } catch (err) {
//       console.log("error uploading image", err);
//       return null;
//     }
//   };
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageData(file);
//     const reader = new FileReader();
//     reader.onload = () => setPreviewImage(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   const fetchFoods = async () => {
//     const data = await getFoods();
//     if (data) setFoods(data);
//   };
//   const [category, setCategory] = useState([]);

//   const fetchCategories = async () => {
//     const data = await getCategories();
//     if (data) setCategory(data);
//   };
//   useEffect(() => {
//     fetchFoods();
//     fetchCategories();
//   }, []);

//   return (
//     <>
//       <div className="flex space-x-8">
//         <div className="w-1/3">
//           <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//               <div className="w-[270px] h-[240px] outline-2 outline-offset-2 outline-dashed flex items-center justify-center outline-red-500 rounded-lg flex-col">
//                 <button className="bg-red-500 rounded-full w-[32px] h-[32px] flex items-center justify-center text-white text-xl cursor-pointer">
//                   +
//                 </button>
//                 <p>Add new dish to{category.name}</p>
//               </div>
//             </DialogTrigger>

//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add New Food</DialogTitle>
//                 <DialogDescription>
//                   Enter the food details below.
//                 </DialogDescription>
//               </DialogHeader>

//               <Formik
//                 initialValues={{
//                   foodName: "",
//                   price: 0,
//                   image: "",
//                   ingredients: "",
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ setFieldValue }) => (
//                   <Form>
//                     <div className="mb-4">
//                       <Field
//                         type="text"
//                         name="foodName"
//                         placeholder="Food Name"
//                         className="border p-2 rounded w-full"
//                       />
//                       <ErrorMessage
//                         name="foodName"
//                         component="div"
//                         className="text-red-500 text-sm"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <Field
//                         type="number"
//                         name="price"
//                         placeholder="Price"
//                         className="border p-2 rounded w-full"
//                       />
//                       <ErrorMessage
//                         name="price"
//                         component="div"
//                         className="text-red-500 text-sm"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <Field
//                         type="text"
//                         name="image"
//                         placeholder="Image URL"
//                         className="border p-2 rounded w-full"
//                       />
//                       <ErrorMessage
//                         name="image"
//                         component="div"
//                         className="text-red-500 text-sm"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <Field
//                         as="textarea"
//                         name="ingredients"
//                         placeholder="Ingredients"
//                         className="border p-2 rounded w-full"
//                       />
//                       <ErrorMessage
//                         name="ingredients"
//                         component="div"
//                         className="text-red-500 text-sm"
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                     >
//                       Add Food
//                     </button>
//                   </Form>
//                 )}
//               </Formik>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Food List Section */}
//         <div className="w-full">
//           <ul className="w-full h-full flex flex-wrap gap-3">
//             {Array.isArray(foods) && foods.length > 0 ? (
//               foods.map((food) => (
//                 <li
//                   key={food._id}
//                   className="w-[270px] h-[240px] outline-1 outline-offset-2 outline-solid p-4 rounded-lg bg-white shadow-lg"
//                 >
//                   <img
//                     src={food.image}
//                     className="w-20 h-20 object-cover rounded-md mt-2"
//                   />
//                   <div className="flex items-center justify-between">
//                     <p className=" text-lg text-red-400">{food.foodName}</p>
//                     <p className="text-sm text-gray-500">${food.price}</p>
//                   </div>
//                   <p className="mt-2 text-sm text-gray-700">
//                     {food.ingredients}
//                   </p>
//                 </li>
//               ))
//             ) : (
//               <li>No foods found.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FoodContainer;
