import Categories from "../_components/Categories";
import CategoriesContainer from "../_components/CategoriesContainer";

const FoodMenu = () => {
  return (
    <div className="w-full h-full bg-red-500">
      <Categories />
      <CategoriesContainer />
    </div>
  );
};

export default FoodMenu;
