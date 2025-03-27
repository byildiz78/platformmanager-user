"use client";

import { useState } from "react";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { OrdersSection } from "@/components/orders/OrdersSection";
import { PlatformStatusTable } from "@/components/platforms/PlatformStatusTable";
import { Footer } from "@/components/layout/Footer";
import { 
  Clock, 
  CheckCircle, 
  Truck, 
  Package, 
  XCircle,
  ShoppingBag
} from "lucide-react";

// Mock data
const mockOrders = [
  {
    id: 1,
    platform: "Getir",
    table: "",
    customer: "YAKUP O.",
    note: "",
    address: "",
    amount: 324.00,
    orderTime: "18:25",
    elapsedTime: "23",
    status: "pending"
  },
  {
    id: 2,
    platform: "Migros Yemek",
    table: "",
    customer: "Berk Çağlar",
    note: "",
    address: "Kadıköy",
    amount: 289.00,
    orderTime: "13:46",
    elapsedTime: "15",
    status: "pending"
  },
  {
    id: 3,
    platform: "Yemek Sepeti",
    table: "",
    customer: "Ebrar Karabastık",
    note: "",
    address: "",
    amount: 308.00,
    orderTime: "18:48",
    elapsedTime: "22",
    status: "pending"
  },
  {
    id: 4,
    platform: "Migros Yemek",
    table: "",
    customer: "Berk Çağlar",
    note: "",
    address: "Kadıköy",
    amount: 289.00,
    orderTime: "13:46",
    elapsedTime: "15",
    status: "approved"
  },
  {
    id: 5,
    platform: "Migros Yemek",
    table: "",
    customer: "Ebrar Karabastık",
    note: "",
    address: "",
    amount: 308.00,
    orderTime: "18:48",
    elapsedTime: "25",
    status: "approved"
  },
  {
    id: 6,
    platform: "Yemek Sepeti",
    table: "",
    customer: "Merve Özbahar",
    note: "",
    address: "",
    amount: 342.00,
    orderTime: "17:36",
    elapsedTime: "33",
    status: "approved"
  },
  // In Transit Orders
  {
    id: 7,
    platform: "Getir",
    table: "",
    customer: "Ahmet Yılmaz",
    note: "Kapıda kredi kartı ile ödeme",
    address: "Beşiktaş",
    amount: 156.50,
    orderTime: "14:20",
    elapsedTime: "35",
    status: "in_transit"
  },
  {
    id: 8,
    platform: "Yemek Sepeti",
    table: "",
    customer: "Zeynep Kaya",
    note: "Zile basmayın, bebek uyuyor",
    address: "Şişli",
    amount: 215.75,
    orderTime: "15:10",
    elapsedTime: "37",
    status: "in_transit"
  },
  // Delivered Orders
  {
    id: 9,
    platform: "Migros Yemek",
    table: "",
    customer: "Mehmet Demir",
    note: "",
    address: "Kadıköy",
    amount: 178.25,
    orderTime: "12:35",
    elapsedTime: "39",
    status: "delivered"
  },
  {
    id: 10,
    platform: "Getir",
    table: "",
    customer: "Ayşe Yıldız",
    note: "Teslim edildi",
    address: "Üsküdar",
    amount: 267.00,
    orderTime: "13:15",
    elapsedTime: "44",
    status: "delivered"
  },
  {
    id: 11,
    platform: "Yemek Sepeti",
    table: "",
    customer: "Can Özkan",
    note: "Müşteri memnun",
    address: "Maltepe",
    amount: 195.50,
    orderTime: "16:45",
    elapsedTime: "45",
    status: "delivered"
  },
  // Cancelled Orders
  {
    id: 12,
    platform: "Getir",
    table: "",
    customer: "Deniz Aydın",
    note: "Müşteri iptal etti",
    address: "Beylikdüzü",
    amount: 145.00,
    orderTime: "19:20",
    elapsedTime: "53",
    status: "cancelled"
  },
  {
    id: 13,
    platform: "Migros Yemek",
    table: "",
    customer: "Burak Şahin",
    note: "Yanlış sipariş",
    address: "Ataşehir",
    amount: 320.75,
    orderTime: "17:55",
    elapsedTime: "55",
    status: "cancelled"
  }
];

export default function Home() {
  const [orders, setOrders] = useState(mockOrders);

  const handleStatusChange = (status: 'approved' | 'rejected', order: any) => {
    setOrders(orders.map(o => {
      if (o.id === order.id) {
        return {
          ...o,
          status: status
        };
      }
      return o;
    }));
  };

  const pendingOrders = orders.filter(order => order.status === "pending");
  const approvedOrders = orders.filter(order => order.status === "approved");
  const inTransitOrders = orders.filter(order => order.status === "in_transit");
  const deliveredOrders = orders.filter(order => order.status === "delivered");
  const cancelledOrders = orders.filter(order => order.status === "cancelled");
  
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'in_transit' | 'delivered' | 'cancelled'>('pending');

  return (
    <div 
      className="flex flex-col min-h-screen relative"
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Semi-transparent overlay for better readability - reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50"></div>
      
      {/* Content with relative positioning to appear above the background */}
      <div className="relative z-10 flex flex-col flex-grow">
        <TopNavigation />
        
        <div className="container mx-auto px-4 py-8 space-y-8 flex-grow">
          {/* Platform Status Table */}
          <PlatformStatusTable />
          
          {/* Tab navigation */}
          <div className="flex flex-wrap gap-4 mb-6 bg-white/80 p-4 rounded-xl shadow-md backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Clock className="h-4.5 w-4.5" />
              Yeni
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-amber-600'
              }`}>
                {pendingOrders.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === 'approved'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <CheckCircle className="h-4.5 w-4.5" />
              Onaylanan
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'approved' ? 'bg-white/20 text-white' : 'bg-green-500/10 text-green-600'
              }`}>
                {approvedOrders.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('in_transit')}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === 'in_transit'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Truck className="h-4.5 w-4.5" />
              Yolda
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'in_transit' ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-600'
              }`}>
                {inTransitOrders.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('delivered')}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === 'delivered'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Package className="h-4.5 w-4.5" />
              Teslim
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'delivered' ? 'bg-white/20 text-white' : 'bg-purple-500/10 text-purple-600'
              }`}>
                {deliveredOrders.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === 'cancelled'
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <XCircle className="h-4.5 w-4.5" />
              İptal
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'cancelled' ? 'bg-white/20 text-white' : 'bg-gray-500/10 text-gray-600'
              }`}>
                {cancelledOrders.length}
              </span>
            </button>
          </div>
          
          {/* Conditional rendering based on active tab */}
          {activeTab === 'pending' && (
            <OrdersSection
              title="Yeni Siparişler"
              orders={pendingOrders}
              type="pending"
              gradientColors={{ from: "amber-500", to: "orange-500" }}
              onStatusChange={handleStatusChange}
            />
          )}
          
          {activeTab === 'approved' && (
            <OrdersSection
              title="Onaylanan Siparişler"
              orders={approvedOrders}
              type="approved"
              gradientColors={{ from: "green-500", to: "green-600" }}
              onStatusChange={handleStatusChange}
            />
          )}
          
          {activeTab === 'in_transit' && (
            <OrdersSection
              title="Yolda ki Siparişler"
              orders={inTransitOrders}
              type="in_transit"
              gradientColors={{ from: "blue-500", to: "blue-600" }}
              onStatusChange={handleStatusChange}
            />
          )}
          
          {activeTab === 'delivered' && (
            <OrdersSection
              title="Teslim Edilen Siparişler"
              orders={deliveredOrders}
              type="delivered"
              gradientColors={{ from: "purple-500", to: "purple-600" }}
              onStatusChange={handleStatusChange}
            />
          )}
          
          {activeTab === 'cancelled' && (
            <OrdersSection
              title="İptal Edilen Siparişler"
              orders={cancelledOrders}
              type="cancelled"
              gradientColors={{ from: "gray-600", to: "gray-700" }}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}