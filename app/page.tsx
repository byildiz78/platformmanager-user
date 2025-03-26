"use client";

import { useState } from "react";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { OrdersSection } from "@/components/orders/OrdersSection";

const mockOrders = [
  {
    id: 1,
    platform: "Getir",
    restaurant: "Getir",
    customer: "YAKUP O.",
    note: "-",
    address: "-",
    total: "324,00 ₺",
    time: "18:25",
    duration: "174259",
    status: "pending",
  },
  {
    id: 2,
    platform: "Yemeksepeti",
    restaurant: "Migros Yemek",
    customer: "Berk Çağlar",
    note: "-",
    address: "Kadıköy",
    total: "289,00 ₺",
    time: "13:46",
    duration: "188938",
    status: "approved",
  },
  {
    id: 3,
    platform: "Yemeksepeti",
    restaurant: "Migros Yemek",
    customer: "Berk Çağlar",
    note: "-",
    address: "Kadıköy",
    total: "289,00 ₺",
    time: "13:46",
    duration: "188938",
    status: "pending",
  },
  {
    id: 4,
    platform: "Yemeksepeti",
    restaurant: "Migros Yemek",
    customer: "Ebrar Karabastık",
    note: "-",
    address: "-",
    total: "308,00 ₺",
    time: "18:48",
    duration: "295195",
    status: "approved",
  },
  {
    id: 5,
    platform: "YemekSepeti",
    restaurant: "Yemek Sepeti",
    customer: "Ebrar Karabastık",
    note: "-",
    address: "-",
    total: "308,00 ₺",
    time: "18:48",
    duration: "295195",
    status: "pending",
  },
  {
    id: 6,
    platform: "YemekSepeti",
    restaurant: "Yemek Sepeti",
    customer: "Merve Özbahar",
    note: "-",
    address: "-",
    total: "342,00 ₺",
    time: "17:36",
    duration: "295268",
    status: "approved",
  }
];

export default function Home() {
  const [orders, setOrders] = useState(mockOrders);

  const handleStatusChange = (orderId: number, newStatus: 'approved' | 'rejected') => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus === 'approved' ? 'approved' : 'rejected'
        };
      }
      return order;
    }));
  };

  const pendingOrders = orders.filter(order => order.status === "pending");
  const approvedOrders = orders.filter(order => order.status === "approved");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <OrdersSection
          title="Yeni Siparişler"
          orders={pendingOrders}
          type="pending"
          gradientColors={{ from: "red-500", to: "red-600" }}
          onStatusChange={handleStatusChange}
        />
        
        <OrdersSection
          title="Onaylanan Siparişler"
          orders={approvedOrders}
          type="approved"
          gradientColors={{ from: "green-500", to: "green-600" }}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}