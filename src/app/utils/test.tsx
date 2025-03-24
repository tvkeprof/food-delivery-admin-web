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
