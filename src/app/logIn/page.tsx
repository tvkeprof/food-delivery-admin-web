/* eslint-disable react/no-unescaped-entities */
"use client";

import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
const LogIn = ({}) => {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://food-delivery-service-te0i.onrender.com/login",
        formData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("Login success", response.data);
      if (response.data.role === "ADMIN") {
        await Router.push("/admin");
      } else {
        await Router.push("/AdminHome");
      }
    } catch (err) {
      console.log("login failed", err);
      alert("aldaaaaaaaaa");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center">
      <div className="flex flex-col bg-white w-[35%] h-[30%] space-y-4 p-4 justify-center m-auto">
        <ChevronLeft />
        <h1 className="font-bold text-2xl">Log in</h1>
        <p>Log in to enjoy your favorite dishes</p>

        <input
          type="email"
          name="email"
          className="border p-2 rounded-lg"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          className="border p-2 rounded-lg"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-gray-300 p-3 rounded-lg"
          onClick={handleLogin}
        >
          Let's go
        </button>
      </div>
      <div className="w-[55%] h-[80%] mr-[100px] relative">
        <Image
          src="/deliveryWithBike.png" // If it's in public folder
          alt="Delivery with bike"
          fill
          className="object-cover rounded-[10px]"
          priority // optional: loads the image faster for above-the-fold
        />
      </div>
    </div>
  );
};
export default LogIn;
