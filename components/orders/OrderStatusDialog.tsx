import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface OrderStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
}

export const OrderStatusDialog = ({ isOpen, onClose, onConfirm, onReject }: OrderStatusDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-md p-0 overflow-hidden rounded-lg border border-gray-200/50 shadow-xl backdrop-blur-sm bg-white/95 animate-fadeIn"
        style={{
          backgroundImage: `url('/bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Semi-transparent overlay for better readability */}
        <div className="absolute inset-0 bg-white/80 rounded-lg"></div>
        
        {/* Content with relative positioning to appear above the background */}
        <div className="relative z-10">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 relative overflow-hidden rounded-t-lg">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="bg-white/15 p-1.5 rounded-lg shadow-inner">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold text-white">Durum Güncelle</DialogTitle>
                  <p className="text-white/80 text-xs mt-0.5">İşlem geri alınamaz</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="rounded-full h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="p-3 space-y-2">
            <p className="text-gray-600 text-center text-sm">Lütfen sipariş için bir durum seçin:</p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={onConfirm}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 rounded-lg flex flex-col items-center gap-1 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-white/20 rounded-full p-1.5">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold">Onayla</span>
              </Button>

              <Button
                onClick={onReject}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-2 rounded-lg flex flex-col items-center gap-1 border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-white/20 rounded-full p-1.5">
                  <XCircle className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold">Reddet</span>
              </Button>
            </div>
            
            <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
              <AlertTriangle className="h-3 w-3 text-amber-500" />
              <span>Bu işlem geri alınamaz</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};