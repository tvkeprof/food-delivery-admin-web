"use client";
import LogoNomNom from "@/app/icons/Logo";
import Vector from "@/app/icons/Vector";
import { Truck } from "lucide-react";

const AdminContollerBar = ({ setStep }: any) => {
  const handleFoodMenuSTeps = () => {
    setStep("menu");
  };
  const handleFoodOrderSTeps = () => {
    setStep("order");
  };

  return (
    <div className="w-[15%] h-screen p-[26px] bg-white">
      <div className="flex w-[165px] h-[44px]">
        <LogoNomNom />
        <div>
          <h1 className="font-bold">NomNom</h1>
          <h1 className="text-xs">Swift delivery</h1>
        </div>
      </div>
      <div className="mt-[40px] flex flex-col space-y-5">
        <div
          className="flex items-center gap-[10px]"
          onClick={handleFoodMenuSTeps}
        >
          <Vector />
          <h1>Food menu</h1>
        </div>
        <div
          className="flex items-center gap-[10px]"
          onClick={handleFoodOrderSTeps}
        >
          <Truck />
          <h1>Orders</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminContollerBar;
