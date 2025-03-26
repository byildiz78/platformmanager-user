import { useState } from "react";
import { TableHeader } from "./TableHeader";
import { OrderRow } from "./OrderRow";
import { OrderDetails } from "./OrderDetails";

interface OrdersSectionProps {
  title: string;
  orders: any[];
  type: "pending" | "approved";
  gradientColors: {
    from: string;
    to: string;
  };
  onStatusChange?: (orderId: number, status: 'approved' | 'rejected') => void;
}

export const OrdersSection = ({ title, orders, type, gradientColors, onStatusChange }: OrdersSectionProps) => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
      <div className={`bg-gradient-to-r from-${gradientColors.from} to-${gradientColors.to} text-white px-6 py-3 inline-block rounded-t-lg shadow-lg`}>
        {title} ({orders.length})
      </div>
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-b-lg overflow-hidden">
        {orders.length > 0 ? (
          <>
            <TableHeader />
            <div className="divide-y divide-gray-100/50">
              {orders.map((order, index) => (
                <OrderRow 
                  key={order.id} 
                  order={order} 
                  index={index} 
                  isApproved={type === "approved"}
                  onSelect={() => setSelectedOrder(order)}
                  onStatusChange={(status) => onStatusChange?.(order.id, status)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Henüz {type === "approved" ? "onaylanmış" : "bekleyen"} sipariş bulunmamaktadır.
          </div>
        )}
      </div>

      <OrderDetails
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
};