import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2, XCircle } from "lucide-react";

interface OrderStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
}

export const OrderStatusDialog = ({ isOpen, onClose, onConfirm, onReject }: OrderStatusDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
          <DialogTitle className="text-xl font-bold text-white">Durum Güncelle</DialogTitle>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={onConfirm}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-8 rounded-xl flex flex-col items-center gap-3 transition-transform hover:scale-105"
            >
              <CheckCircle2 className="h-8 w-8" />
              <span className="text-lg font-semibold">Kabul Edildi</span>
            </Button>

            <Button
              onClick={onReject}
              variant="outline"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-8 rounded-xl flex flex-col items-center gap-3 border-0 transition-transform hover:scale-105"
            >
              <XCircle className="h-8 w-8" />
              <span className="text-lg font-semibold">İptal Edildi</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};