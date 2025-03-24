"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/app/utils/axios";
import FoodContainer from "./AddFood";

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
      {category.slice(2).map((category: any) => (
        <div
          key={category._id}
          className="bg-white w-full h-[325px] rounded-lg flex font-bold flex-col p-4"
        >
          {category.categoryName}
          <div className="w-[270px] h-[240px] flex items-center justify-center flex-col outline-2 outline-offset-2 outline-dashed rounded-lg outline-red-500">
            {/* <div className="bg-red-500 rounded-full w-[32px] h-[32px] flex items-center justify-center text-white text-xl cursor-pointer">
              +
            </div>
            <div>add new dish {category.categoryName}</div> */}
            <FoodContainer />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesContainer;
