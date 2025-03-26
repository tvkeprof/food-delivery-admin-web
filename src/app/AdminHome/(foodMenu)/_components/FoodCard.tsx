import { getFoods, updateFood } from "@/app/utils/axios";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
const NEXT_PUBLIC_CLOUDINARY_API_KEY = "996938878911193";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
}

const EditFoodDialog = ({ food, onClose, onUpdate }) => {
  const [foodName, setFoodName] = useState(food.foodName);
  const [price, setPrice] = useState(food.price);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let imageUrl = food.image;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (response.ok) {
          imageUrl = data.secure_url;
        } else {
          console.error("Cloudinary error:", data);
          alert(`Error uploading image to Cloudinary: ${data.error.message}`);
          return;
        }
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Error uploading image to Cloudinary");
        return;
      }
    }

    const formDataToUpdate = {
      foodName,
      price,
      ingredients,
      image: imageUrl,
    };

    try {
      await updateFood(food._id, formDataToUpdate);
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Error updating food:", err);
      alert("Error updating food.");
    }
  };

  return (
    <DialogContent className="bg-white p-6 rounded-lg shadow-lg w-96">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-gray-700">
          Edit Food
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Modify the food details below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-600">Food Name</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="text-gray-600">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="text-gray-600">Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="text-gray-600">Upload Image</label>
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Update Food
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </form>
    </DialogContent>
  );
};

const FoodCard = ({ categoryId }: { categoryId: string }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const fetchFoods = async () => {
    const fetchedFoods = await getFoods();
    setFoods(fetchedFoods);
  };

  const handleEditClick = (food: Food) => {
    setSelectedFood(food);
  };

  const handleCloseEdit = () => {
    setSelectedFood(null);
  };

  const handleUpdateFood = () => {
    fetchFoods();
  };

  useEffect(() => {
    fetchFoods();
  }, [categoryId]);

  const filteredFoods = categoryId
    ? foods.filter((food) => food.category === categoryId)
    : foods;

  return (
    <div className="w-full h-auto">
      <ul className="w-full h-auto flex flex-wrap gap-3">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <li
              key={food._id}
              className="w-[270px] h-[240px] outline-1 outline-offset-2 outline-solid p-2 rounded-lg bg-white shadow-lg"
            >
              <img
                src={food.image}
                className="w-[230px] h-[130px] object-cover rounded-md mt-2"
              />
              <div className="flex items-center justify-between">
                <p className="text-lg text-red-400">{food.foodName}</p>
                <p className="text-sm text-gray-500">${food.price}</p>
              </div>
              <p className="mt-2 text-sm text-gray-700">{food.ingredients}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={() => handleEditClick(food)}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </DialogTrigger>

                {selectedFood && (
                  <EditFoodDialog
                    food={selectedFood}
                    onClose={handleCloseEdit}
                    onUpdate={handleUpdateFood}
                  />
                )}
              </Dialog>
            </li>
          ))
        ) : (
          <li>No foods found.</li>
        )}
      </ul>
    </div>
  );
};

export default FoodCard;
