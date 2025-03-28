"use client";

import { useEffect, useState } from "react";
import { getCategories, addCategory } from "@/app/utils/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { useCategory } from "@/components/AuthProvider/CategoryProvider";

const Categories = () => {
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);

  const { categories, loading, fetchCategories } = useCategory();

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      await addCategory({ categoryName: newCategory });

      setNewCategory("");
      setOpen(false);
      fetchCategories();
      toast.success("👍🏿 Successfully added category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("Failed to add category:", err);
      alert("Couldn't add category");
      toast.error("❌ Failed to add category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div>
        <p>Profile picture here</p>
      </div>

      <div className="bg-[#FFFFFF] rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>

        <div className="flex gap-4 flex-wrap items-center">
          {categories.map((category: any) => (
            <div
              key={category._id}
              className="bg-white w-[135px] h-[36px] outline-2 rounded-full flex items-center justify-center text-center"
            >
              {category.categoryName}
            </div>
          ))}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="bg-red-500 rounded-full w-[32px] h-[32px] flex items-center justify-center text-white text-xl cursor-pointer">
                +
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Enter a name and click "Add"
                </DialogDescription>
              </DialogHeader>

              <input
                type="text"
                placeholder="Category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="border rounded p-2 w-full mt-2"
              />

              <button
                onClick={handleAddCategory}
                className="mt-4 bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
              >
                Add
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Categories;
