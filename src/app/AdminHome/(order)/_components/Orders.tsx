"use client";

import { useEffect, useState } from "react";
import { getOrder } from "@/app/utils/axios";
import { useUser } from "@/components/AuthProvider/UserProvider";

interface FoodOrder {
  updatedAt: string | number | Date;
  _id: string;
  user: string;
  totalPrice: number;
  image: string;
  foodOrderItems: { food: string; quantity: number }[];
  status: string;
}

export const AllOrders = () => {
  const [orders, setOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const user = useUser();

  if (!user) return <p>Loading...</p>; // Handle loading state

  const { email } = user;

  console.log(email); // Debugging

  const fetchOrders = async () => {
    try {
      const data = await getOrder();
      if (data) {
        setOrders(data);
      } else {
        setError("No orders found.");
      }
    } catch (err) {
      console.error("🔥 Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  console.log(orders, "this is order");
  return (
    <div className="w-full h-auto p-8">
      <div className="flex justify-between mb-[20px] ">
        <p className="font-bold text-2xl">Orders</p>
        <button className="font-bold text-xl">Change delivery state</button>
      </div>
      <div className="flex justify-between">
        <p className="w-[220px] h-[50px]">Customer</p>
        <p className="w-[60px] h-[50px] ">Food</p>
        <p className="w-[160px] h-[50px] ">Date</p>
        <p className="w-[160px] h-[50px] ">Total Price</p>
        <p className="w-[160px] h-[50px] ">Delivery state</p>
      </div>
      <div>
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <div
              key={order._id}
              className="w-full h-auto flex justify-between outline-1"
            >
              <div className="">
                <p className="w-[220px] h-auto ">{email}</p>
              </div>
              <div className="">
                <p className="w-[60px] h-auto">{order.foodOrderItems.length}</p>
              </div>
              <div className="">
                <p className="w-[160px] h-auto">
                  Updated At: {new Date(order.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="">
                <p className="w-[160px] h-auto">{order.totalPrice}$</p>
              </div>
              <div className="">
                <p className="w-[160px] h-auto">{order.status}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
