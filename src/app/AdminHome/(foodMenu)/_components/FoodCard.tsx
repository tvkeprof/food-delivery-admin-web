// import { getFoods, updateFood } from "@/app/utils/axios";
// import { useState, useEffect } from "react";

// const FoodCard = ({ categoryId }: { categoryId: string }) => {

//   const [foods, setFoods] = useState<any[]>([]);

//   const fetchFoods = async () => {
//     const fetchedFoods = await getFoods();
//     setFoods(fetchedFoods);
//   };

//   useEffect(() => {
//     fetchFoods();
//   }, []);
//   const filteredFoods = categoryId
//     ? foods.filter((food) => food.category === categoryId) // Filter based on category
//     : foods;

//   return (
//     <>
//       {/* Food List Section */}
//       <div className="w-full h-auto">
//         <ul className="w-full h-auto flex flex-wrap gap-3">
//           {filteredFoods.length > 0 ? (
//             filteredFoods.map((food) => (
//               <li
//                 key={food._id}
//                 className="w-[270px] h-[240px] outline-1 outline-offset-2 outline-solid p-2 rounded-lg bg-white shadow-lg"
//               >
//                 <img
//                   src={food.image}
//                   className="w-[230px] h-[130px] object-cover rounded-md mt-2"
//                 />
//                 <div className="flex items-center justify-between">
//                   <p className="text-lg text-red-400">{food.foodName}</p>
//                   <p className="text-sm text-gray-500">${food.price}</p>
//                 </div>
//                 <p className="mt-2 text-sm text-gray-700">{food.ingredients}</p>
//               </li>
//             ))
//           ) : (
//             <li>No foods found.</li>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default FoodCard;
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

// Edit Food Form Component
const EditFoodDialog = ({ food, onClose, onUpdate }) => {
  const [foodName, setFoodName] = useState(food.foodName);
  const [price, setPrice] = useState(food.price);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [image, setImage] = useState(food.image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the updated data to the backend
      await updateFood(food._id, { foodName, price, ingredients, image });
      onUpdate(); // Refresh the food list
      onClose(); // Close the modal after updating
    } catch (err) {
      console.log("Error updating food:", err);
      alert("Error updating food.");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Food</DialogTitle>
        <DialogDescription>Modify the food details below.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Food Name</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Food</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </DialogContent>
  );
};

const FoodCard = ({ categoryId }: { categoryId: string }) => {
  const [foods, setFoods] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any | null>(null); // For storing food to be edited

  const fetchFoods = async () => {
    const fetchedFoods = await getFoods();
    setFoods(fetchedFoods);
  };

  const handleEditClick = (food) => {
    setSelectedFood(food); // Set the food to be edited
  };

  const handleCloseEdit = () => {
    setSelectedFood(null); // Close the edit modal
  };

  const handleUpdateFood = () => {
    fetchFoods(); // Refresh the food list after an update
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const filteredFoods = categoryId
    ? foods.filter((food) => food.category === categoryId)
    : foods;

  return (
    <>
      {/* Food List Section */}
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
                {/* Dialog Trigger (Edit Button) */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => handleEditClick(food)}
                      className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </DialogTrigger>

                  {/* Edit Dialog Content */}
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
    </>
  );
};

export default FoodCard;
