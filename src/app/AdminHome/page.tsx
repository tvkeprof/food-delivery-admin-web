"use client";

import { useState } from "react";
import AdminContollerBar from "./_components/AdminContollerBar";
import FoodMenu from "./(foodMenu)/features/FoodMenu";
import Setting from "./(settings)/features/settings";
import FoodOrders from "./(order)/_features/FoodOrders";

const AdminHome = () => {
  const [step, setStep] = useState("menu");

  return (
    <div className="flex bg-[#f5f5f5]">
      <AdminContollerBar setStep={setStep} />
      {step === "menu" && <FoodMenu />}
      {step === "order" && <FoodOrders />}
      {step === "setting" && <Setting />}
    </div>
  );
};
export default AdminHome;
