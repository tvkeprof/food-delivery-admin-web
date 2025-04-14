import { updateFood } from "@/app/utils/axios";
import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
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
interface EditFoodDialogProps {
  food: Food;
  onClose: () => void;
  onUpdate: () => void;
}
export const EditFoodDialog: React.FC<EditFoodDialogProps> = ({
  food,
  onClose,
  onUpdate,
}) => {
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
      price: Number(price),
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
          className="w-[333px] px-4 py-2 text-white bg-black rounded-md hover:bg-gray-500"
        >
          Update Food
        </button>
      </form>
    </DialogContent>
  );
};
