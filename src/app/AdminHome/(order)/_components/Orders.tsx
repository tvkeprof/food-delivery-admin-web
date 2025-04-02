"use client";

import { useEffect, useState } from "react";
import { getOrder } from "@/app/utils/axios";

interface FoodOrder {
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

  return (
    <div className="w-full h-auto ">
      <div className="flex">
        <p>Orders</p>
        <button>Change delivery state</button>
      </div>
    </div>
  );
};
