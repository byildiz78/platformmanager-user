import { useState } from "react";
import { TableHeader } from "./TableHeader";
import { OrderRow } from "./OrderRow";
import { OrderDetails } from "./OrderDetails";

interface Order {
  id: number;
  platform: string;
  table: string;
  customer: string;
  note: string;
  address: string;
  amount: number;
  orderTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_transit' | 'delivered' | 'cancelled';
}

interface OrdersSectionProps {
  title: string;
  orders: any[];
  type: 'pending' | 'approved' | 'in_transit' | 'delivered' | 'cancelled';
  gradientColors: {
    from: string;
    to: string;
  };
  onStatusChange?: (status: 'approved' | 'rejected', order: any) => void;
}

export const OrdersSection = ({ title, orders, type, gradientColors, onStatusChange }: OrdersSectionProps) => {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleOrderSelect = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };
  
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div className="relative w-full mb-8 overflow-hidden rounded-xl shadow-xl bg-white/80 backdrop-blur-md border border-white/20 transform transition-all duration-500 hover:shadow-2xl rounded-t-xl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)"/>
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white animate-float"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Section Header */}
      <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r text-white
        ${type === 'pending' ? 'from-amber-500 to-orange-500' : 
          type === 'approved' ? 'from-green-500 to-green-600' : 
          type === 'in_transit' ? 'from-blue-500 to-blue-600' : 
          type === 'delivered' ? 'from-purple-500 to-purple-600' : 
          type === 'cancelled' ? 'from-gray-600 to-gray-700' : 
          'from-gray-800 to-gray-900'}`}>
        <div className="flex items-center space-x-3">
          <div className="text-lg font-bold">{title}</div>
          <div className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {orders.length}
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-hidden flex flex-col rounded-b-xl">
        {/* Scrollable content with sticky header */}
        <div className="relative max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
          {/* Sticky header - using position sticky */}
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20">
              <tr>
                <th className="p-0">
                  <TableHeader />
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="p-0">
                    <OrderRow
                      order={order}
                      index={index}
                      isApproved={type === 'approved' || type === 'in_transit' || type === 'delivered'}
                      onSelect={() => handleOrderSelect(order)}
                      onStatusChange={(status) => {
                        onStatusChange?.(status, order);
                      }}
                    />
                  </td>
                </tr>
              ))}
              
              {orders.length === 0 && (
                <tr>
                  <td className="p-0">
                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700">Sipariş Bulunamadı</h3>
                      <p className="text-gray-500 mt-2 max-w-sm">Bu kategoride henüz sipariş bulunmamaktadır.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Order details modal */}
      <OrderDetails
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        order={selectedOrder}
      />
    </div>
  );
};