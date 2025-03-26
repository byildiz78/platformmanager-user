import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Info, Check } from "lucide-react";
import { OrderStatusDialog } from "./OrderStatusDialog";

interface OrderRowProps {
  order: {
    platform: string;
    restaurant: string;
    customer: string;
    note: string;
    address: string;
    total: string;
    time: string;
    duration: string;
  };
  index: number;
  isApproved?: boolean;
  onSelect: () => void;
  onStatusChange?: (status: 'approved' | 'rejected') => void;
}

export const OrderRow = ({ order, index, isApproved = false, onSelect, onStatusChange }: OrderRowProps) => {
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const handleStatusChange = (status: 'approved' | 'rejected') => {
    onStatusChange?.(status);
    setIsStatusDialogOpen(false);
  };

  return (
    <>
      <div 
        onClick={onSelect}
        className={`grid grid-cols-10 px-6 py-4 transition-all duration-300 cursor-pointer
          ${index % 2 === 0 ? 'bg-white/80' : 'bg-gray-50/60'} 
          hover:bg-blue-50/30 hover:backdrop-blur-md
          group relative overflow-hidden border-b border-gray-100/50`}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"/>
        
        <div className="flex items-center relative z-10">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
            order.platform === "Getir" 
              ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white" 
              : "bg-gradient-to-br from-red-500 to-red-600 text-white"
          }`}>
            <span className="text-sm font-semibold">
              {order.platform === "Getir" ? "G" : "Y"}
            </span>
          </div>
        </div>
        <div className="flex items-center font-medium text-gray-900">{order.restaurant}</div>
        <div className="flex items-center text-gray-700">{order.customer}</div>
        <div className="flex items-center text-gray-500">{order.note}</div>
        <div className="flex items-center">
          {order.address !== "-" && (
            <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:bg-blue-100">
              <MapPin className="h-4 w-4 mr-1" />
              {order.address}
            </div>
          )}
          {order.address === "-" && <span className="text-gray-400">-</span>}
        </div>
        <div className="flex items-center font-semibold text-gray-900">{order.total}</div>
        <div className="flex items-center text-gray-700">{order.time}</div>
        <div className="flex items-center text-red-600 font-medium">
          <Clock className="h-4 w-4 mr-1" />
          {order.duration} dk
        </div>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-0 shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            Detay
          </Button>
        </div>
        <div className="flex items-center">
          {isApproved ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md transform transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 group-hover:-translate-y-0.5"
            >
              <Check className="h-4 w-4 mr-1" />
              Onaylandı
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsStatusDialogOpen(true);
              }}
              className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-md hover:shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5"
            >
              <Info className="h-4 w-4 mr-1" />
              Onay Bekleniyor
            </Button>
          )}
        </div>
      </div>

      <OrderStatusDialog
        isOpen={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        onConfirm={() => handleStatusChange('approved')}
        onReject={() => handleStatusChange('rejected')}
      />
    </>
  );
};