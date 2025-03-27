import { getFoods } from "@/app/utils/axios";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditSvg from "@/app/icons/EditSvg";
import { EditFoodDialog } from "./EditFood";

interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
}

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
      <ul className="w-full h-auto flex flex-wrap gap-8">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <li
              key={food._id}
              className="w-[270px] h-auto outline-1 outline-offset-2 outline-solid p-2 rounded-lg bg-white shadow-lg"
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
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700 "
                  >
                    <EditSvg />
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
