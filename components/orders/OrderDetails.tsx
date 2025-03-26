import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Phone, MapPin, Info, CreditCard, Package2, User } from "lucide-react";

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export const OrderDetails = ({ isOpen, onClose, order }: OrderDetailsProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl p-0 h-[95vh] overflow-hidden relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between shadow-lg relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Package2 className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Sipariş Detayları</DialogTitle>
              <p className="text-blue-100 mt-1">Order #{order.id}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-8 space-y-6 h-[calc(95vh-88px)] overflow-y-auto custom-scrollbar relative z-10">
          {/* Müşteri Bilgileri */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-100" />
              <h3 className="text-lg font-semibold text-white">Müşteri Bilgileri</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Sipariş No</div>
                  <div className="mt-1 font-mono text-sm bg-gray-50/80 backdrop-blur-sm p-2 rounded border border-gray-100">
                    140afd22-e68d-4736-b3d1-9c0ceeb42580
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Pazaryeri Sipariş No</div>
                  <div className="mt-1 font-mono text-sm bg-gray-50/80 backdrop-blur-sm p-2 rounded border border-gray-100">
                    536511441
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    Telefon
                  </div>
                  <div className="mt-1 font-medium">*****5446</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">İsim</div>
                  <div className="mt-1 font-medium">Berk Çağlar</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    Adres
                  </div>
                  <div className="mt-1 text-gray-600 leading-relaxed">
                    Ofis park daire 7, Zafer Mh., Efeler, Aydın, Zafer Mh. 106.sokak No 46 Daire 7 Ofispark Bina No:46 Kat:1 Daire No:7 Efeler/Aydın
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sipariş Detayları */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center gap-2">
              <Package2 className="h-5 w-5 text-blue-100" />
              <h3 className="text-lg font-semibold text-white">Sipariş Detayları</h3>
            </div>
            <div className="p-6">
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500 p-4 border-b border-gray-200">
                  <div>Ürün Adı</div>
                  <div className="text-center">Adet</div>
                  <div className="text-center">İndirim</div>
                  <div className="text-center">Tutar</div>
                  <div>Not</div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="grid grid-cols-5 gap-4 p-4 bg-white/60 backdrop-blur-sm">
                    <div className="font-medium text-gray-900">Migros Özel Kuşbaşı Menü</div>
                    <div className="text-center">1</div>
                    <div className="text-center text-gray-500">0,00 ₺</div>
                    <div className="text-center font-medium text-gray-900">279,00 ₺</div>
                    <div className="text-gray-500">-</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50/60 backdrop-blur-sm">
                    <div className="pl-6 text-gray-600">PKT ÇORBA</div>
                    <div className="text-center">1</div>
                    <div className="text-center text-gray-500">0,00 ₺</div>
                    <div className="text-center text-gray-500">0,00 ₺</div>
                    <div className="text-gray-500">-</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50/60 backdrop-blur-sm">
                    <div className="pl-6 text-gray-600">PKT KUŞBAŞILI PİDE TEK</div>
                    <div className="text-center">1</div>
                    <div className="text-center text-gray-500">0,00 ₺</div>
                    <div className="text-center text-gray-500">0,00 ₺</div>
                    <div className="text-gray-500">-</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50/60 backdrop-blur-sm">
                    <div className="pl-6 text-gray-600">ROKA SALATA</div>
                    <div className="text-center">1</div>
                    <div className="text-center text-gray-500">10,00 ₺</div>
                    <div className="text-center text-gray-500">10,00 ₺</div>
                    <div className="text-gray-500">-</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50/60 backdrop-blur-sm">
                    <div className="pl-6 text-gray-600">AYRAN</div>
                    <div className="text-center">1</div>
                    <div className="text-center text-gray-500">0,00 ₺</div>
                    <div className="text-center text-gray-500">0,00 ₺</div>
                    <div className="text-gray-500">-</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sipariş Özeti */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-100" />
              <h3 className="text-lg font-semibold text-white">Sipariş Özeti</h3>
            </div>
            <div className="p-6">
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg divide-y divide-gray-200">
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Ödeme Tipi</span>
                  <span className="font-medium text-gray-900">ONLINE_CARD_PAYMENT</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Tutar</span>
                  <span className="font-medium text-gray-900">289,00 ₺</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">İndirim</span>
                  <span className="font-medium text-gray-900">0,00 ₺</span>
                </div>
                <div className="flex justify-between p-4 bg-blue-50/90">
                  <span className="font-semibold text-gray-900">Toplam</span>
                  <span className="text-xl font-bold text-blue-600">289,00 ₺</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};