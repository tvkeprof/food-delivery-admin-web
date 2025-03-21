"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/app/utils/axios";

const CategoriesContainer = () => {
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const data = await getCategories();
    if (data) setCategory(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="w-full h-screen bg-[#f5f5f5] mt-[50px] flex flex-col space-y-5">
      {category.map((category: any) => (
        <div
          key={category._id}
          className="bg-white w-full h-[325px] rounded-lg flex p-4"
        >
          {category.categoryName}
        </div>
      ))}
    </div>
  );
};

export default CategoriesContainer;
