import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:9999/category");
    return response.data;
  } catch (err) {
    console.log("err while gettin categories", err);
  }
};

export const addCategory = async (categoryData: { categoryName: string }) => {
  try {
    const response = await axios.post(
      "http://localhost:9999/category",
      categoryData
    );
    return response.data;
  } catch (err) {
    console.log("Error while adding category", err);
  }
};

export const addFood = async (foodData: {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
}) => {
  try {
    const response = await axios.post("http://localhost:9999/food", foodData);
    return response.data;
  } catch (err) {
    console.log("Error while adding food:", err);
  }
};

export const getFoods = async () => {
  try {
    const response = await axios.get("http://localhost:9999/food");
    return response.data;
  } catch (err) {
    console.log("err while getting foods", err);
  }
};

export const updateFood = async (id: any, updatedFoodData: FormData) => {
  try {
    const response = await axios.put(
      `http://localhost:9999/food/${id}`,
      updatedFoodData
    );
    return response.data;
  } catch (err) {
    console.log("Error updating food:", err);
  }
};
export const getOrder = async () => {
  try {
    const response = await axios.get("http://localhost:9999/order");
    return response.data;
  } catch (err) {
    console.log("err getting order", err);
  }
};
