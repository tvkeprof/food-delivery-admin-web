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
