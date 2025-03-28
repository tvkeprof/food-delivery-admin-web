"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { getFoods } from "@/app/utils/axios";

type FoodType = {
  _id: string;
  foodName: string;
  category: string;
  price: number;
  image: string;
  ingredients: string;
};

type FoodContextType = {
  foods: FoodType[];
  loading: boolean;
};

const FoodContext = createContext<FoodContextType>({
  foods: [],
  loading: true,
});

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods();
        setFoods(data || []);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, loading }}>
      {loading ? <div>Loading foods...</div> : children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  return useContext(FoodContext);
};
