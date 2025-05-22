"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { getCategories } from "@/app/utils/axios";

type CategoryContextType = {
  categories: { _id: string; categoryName: string }[];
  loading: boolean;
  fetchCategories: () => void;
};

const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<
    CategoryContextType["categories"]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, fetchCategories }}>
      {loading ? <div>Loading categories...</div> : children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
