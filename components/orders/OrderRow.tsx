import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Info, Check } from "lucide-react";
import { OrderStatusDialog } from "./OrderStatusDialog";
import { AddressModal } from "./AddressModal";

interface OrderRowProps {
  order: {
    platform: string;
    customer: string;
    note: string;
    address: string;
    amount: number;
    orderTime: string;
    elapsedTime: string;
  };
  index: number;
  isApproved?: boolean;
  onSelect: () => void;
  onStatusChange?: (status: 'approved' | 'rejected') => void;
}

export const OrderRow = ({ order, index, isApproved = false, onSelect, onStatusChange }: OrderRowProps) => {
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleStatusChange = (status: 'approved' | 'rejected') => {
    onStatusChange?.(status);
    setIsStatusDialogOpen(false);
  };

  return (
    <>
      <div 
        onClick={onSelect}
        className={`grid grid-cols-9 px-6 py-5 transition-all duration-500 cursor-pointer
          ${index % 2 === 0 ? 'bg-white/90' : 'bg-gray-50/80'} 
          hover:bg-blue-50/50 hover:backdrop-blur-md
          group relative overflow-hidden border-b border-gray-100/50`}
        style={{
          transform: 'translateZ(0)', // Force hardware acceleration
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Animated highlight bar */}
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blue-400 to-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"/>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="flex items-center relative z-10">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
            order.platform === "Getir" 
              ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white" 
              : "bg-gradient-to-br from-red-500 to-red-700 text-white"
          }`}>
            <span className="text-lg font-bold">
              {order.platform === "Getir" ? "G" : "Y"}
            </span>
            {/* Platform badge shine effect */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute -inset-x-full top-0 h-full w-1/2 transform -skew-x-12 bg-white/20 opacity-0 group-hover:animate-shimmer"></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-700">{order.customer}</div>
        <div className="flex items-center text-gray-500">{order.note || "-"}</div>
        <div className="flex items-center">
          <div 
            className="flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-md group-hover:bg-blue-100"
            onClick={(e) => {
              e.stopPropagation();
              setIsAddressModalOpen(true);
            }}
          >
            <MapPin className="h-4 w-4 mr-1 text-blue-500" />
            {order.address || "-"}
          </div>
        </div>
        <div className="flex items-center font-semibold text-gray-900">{order.amount.toFixed(2)} ₺</div>
        <div className="flex items-center text-gray-700">{order.orderTime}</div>
        <div className="flex items-center text-red-600 font-medium">
          <Clock className="h-4 w-4 mr-1" />
          {order.elapsedTime} dk
        </div>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-0 shadow-md hover:shadow-lg transform transition-all duration-500 hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              <Info className="h-4 w-4 mr-1.5" />
              Detay
            </span>
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500"></span>
          </Button>
        </div>
        <div className="flex items-center">
          {isApproved ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md transform transition-all duration-500 group-hover:shadow-lg group-hover:scale-105 group-hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <Check className="h-4 w-4 mr-1.5" />
                Onaylandı
              </span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500"></span>
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsStatusDialogOpen(true);
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-md transform transition-all duration-500 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10">İşlem Yap</span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500"></span>
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

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        address={order.address}
      />
    </>
  );
};