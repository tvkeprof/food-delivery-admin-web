"use client";
import LogoNomNom from "../icons/Logo";
import Settings from "../icons/Settings";
import Truck from "../icons/Truck";
import Vector from "../icons/Vector";
export const OrderInfo = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[10%] h-full">
        <div className="flex w-[165px] h-[44px]">
          <LogoNomNom />
          <div>
            <h1>NomNom</h1>
            <h1>Swift delivery</h1>
          </div>
        </div>
        <div>
          <div className="flex">
            <Vector />
            <h1>Food menu</h1>
          </div>
          <div className="flex">
            <Truck />
            <h1>Orders</h1>
          </div>
          <div className="flex">
            <Settings />
            <h1>Settings</h1>
          </div>
        </div>
      </div>
      <div className="w-[90%] h-sfull bg-black">
        <p>side 2</p>
      </div>
    </div>
  );
};
