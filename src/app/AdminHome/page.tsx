"use client";

import { useState } from "react";
import AdminContollerBar from "./_components/AdminContollerBar";
import FoodMenu from "./(foodMenu)/features/FoodMenu";
import FoodOrders from "./(order)/_features/FoodOrders";
import { useUser } from "@/components/AuthProvider/UserProvider";
import { useCategory } from "@/components/AuthProvider/CategoryProvider";
import { useFood } from "@/components/AuthProvider/FoodProvider";
const AdminHome = () => {
  const [step, setStep] = useState("menu");
  const { email, role } = useUser();
  console.log("email", email, role);
  const { categories } = useCategory();
  console.log("Category", categories);
  const { foods } = useFood();
  console.log("Foods", foods);

  return (
    <div className="flex bg-[#f5f5f5]">
      <AdminContollerBar setStep={setStep} />
      {step === "menu" && <FoodMenu />}
      {step === "order" && <FoodOrders />}
    </div>
  );
};
export default AdminHome;
