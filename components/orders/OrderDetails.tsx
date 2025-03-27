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

  // Determine the color scheme based on order status
  const getColorScheme = () => {
    switch(order.status) {
      case 'pending':
        return 'from-amber-500 to-orange-500';
      case 'approved':
        return 'from-green-500 to-green-600';
      case 'in_transit':
        return 'from-blue-500 to-blue-600';
      case 'delivered':
        return 'from-purple-500 to-purple-600';
      case 'cancelled':
        return 'from-gray-600 to-gray-700';
      default:
        return 'from-blue-600 to-blue-700';
    }
  };

  const colorScheme = getColorScheme();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[90vw] md:max-w-[80vw] lg:max-w-4xl p-0 h-[80vh] max-h-[80vh] overflow-hidden relative bg-white/95 backdrop-blur-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundImage: `url('/bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Semi-transparent overlay for better readability */}
        <div className="absolute inset-0 bg-white/80"></div>
        
        {/* Content with relative positioning to appear above the background */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className={`bg-gradient-to-r ${colorScheme} text-white p-3 flex items-center justify-between shadow-lg relative z-10`}>
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <Package2 className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold">Sipariş Detayları</DialogTitle>
                <p className="text-white/80 text-xs">Order #{order.id}</p>
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

          <div className="p-4 space-y-4 h-[calc(80vh-60px)] overflow-y-auto custom-scrollbar relative z-10">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Müşteri Bilgileri */}
              <div className="bg-white/90 rounded-lg shadow overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <div className={`bg-gradient-to-r ${colorScheme} px-3 py-1.5 flex items-center gap-1.5`}>
                  <User className="h-3.5 w-3.5 text-white/80" />
                  <h3 className="text-sm font-semibold text-white">Müşteri Bilgileri</h3>
                </div>
                <div className="p-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs font-medium text-gray-500">İsim</div>
                      <div className="mt-0.5 font-medium text-xs">{order.customer}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        Telefon
                      </div>
                      <div className="mt-0.5 font-medium text-xs">*****5446</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      Adres
                    </div>
                    <div className="mt-0.5 text-xs text-gray-600 leading-tight">
                      {order.address || "Adres bilgisi bulunmamaktadır."}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs font-medium text-gray-500">Sipariş No</div>
                      <div className="mt-0.5 font-mono text-xs bg-gray-50/80 p-1 rounded border border-gray-100 truncate">
                        140afd22-e68d-4736-b3d1
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500">Pazaryeri Sipariş No</div>
                      <div className="mt-0.5 font-mono text-xs bg-gray-50/80 p-1 rounded border border-gray-100">
                        536511441
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sipariş Özeti */}
              <div className="bg-white/90 rounded-lg shadow overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <div className={`bg-gradient-to-r ${colorScheme} px-3 py-1.5 flex items-center gap-1.5`}>
                  <CreditCard className="h-3.5 w-3.5 text-white/80" />
                  <h3 className="text-sm font-semibold text-white">Sipariş Özeti</h3>
                </div>
                <div className="p-2">
                  <div className="bg-gray-50/80 rounded divide-y divide-gray-200">
                    <div className="flex justify-between p-1.5">
                      <span className="text-xs text-gray-600">Ödeme Tipi</span>
                      <span className="font-medium text-xs text-gray-900">ONLINE_CARD_PAYMENT</span>
                    </div>
                    <div className="flex justify-between p-1.5">
                      <span className="text-xs text-gray-600">Tutar</span>
                      <span className="font-medium text-xs text-gray-900">{order.amount?.toFixed(2)} ₺</span>
                    </div>
                    <div className="flex justify-between p-1.5">
                      <span className="text-xs text-gray-600">İndirim</span>
                      <span className="font-medium text-xs text-gray-900">0,00 ₺</span>
                    </div>
                    <div className={`flex justify-between p-1.5 bg-opacity-10`} style={{backgroundColor: order.status === 'pending' ? '#f59e0b' : order.status === 'approved' ? '#22c55e' : order.status === 'in_transit' ? '#3b82f6' : order.status === 'delivered' ? '#a855f7' : '#4b5563'}}>
                      <span className="font-semibold text-xs text-gray-900">Toplam</span>
                      <span className={`text-sm font-bold`} style={{color: order.status === 'pending' ? '#f59e0b' : order.status === 'approved' ? '#22c55e' : order.status === 'in_transit' ? '#3b82f6' : order.status === 'delivered' ? '#a855f7' : '#4b5563'}}>{order.amount?.toFixed(2)} ₺</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Status */}
            <div className="bg-white/90 rounded-lg shadow overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className={`bg-gradient-to-r ${colorScheme} px-3 py-1.5 flex items-center gap-1.5`}>
                <Info className="h-3.5 w-3.5 text-white/80" />
                <h3 className="text-sm font-semibold text-white">Sipariş Durumu</h3>
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                      order.status === 'approved' ? 'bg-green-100 text-green-600' : 
                      order.status === 'in_transit' ? 'bg-blue-100 text-blue-600' : 
                      order.status === 'delivered' ? 'bg-purple-100 text-purple-600' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {order.status === 'pending' && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>}
                      {order.status === 'approved' && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>}
                      {order.status === 'in_transit' && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>}
                      {order.status === 'delivered' && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>}
                      {order.status === 'cancelled' && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">
                        {order.status === 'pending' ? 'Beklemede' : 
                         order.status === 'approved' ? 'Onaylandı' : 
                         order.status === 'in_transit' ? 'Yolda' : 
                         order.status === 'delivered' ? 'Teslim Edildi' : 
                         'İptal Edildi'}
                      </div>
                      <div className="text-xs text-gray-500">Sipariş saati: {order.orderTime}</div>
                    </div>
                  </div>
                  
                  {order.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:bg-green-600 text-xs h-7 px-2 shadow-sm"
                      >
                        Onayla
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-600 hover:bg-gray-50 text-xs h-7 px-2"
                      >
                        Reddet
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sipariş Detayları */}
            <div className="bg-white/90 rounded-lg shadow overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className={`bg-gradient-to-r ${colorScheme} px-3 py-1.5 flex items-center gap-1.5`}>
                <Package2 className="h-3.5 w-3.5 text-white/80" />
                <h3 className="text-sm font-semibold text-white">Sipariş Detayları</h3>
              </div>
              <div className="p-2">
                <div className="bg-gray-50/80 rounded overflow-hidden">
                  <div className="grid grid-cols-5 gap-1 text-xs font-medium text-gray-500 p-1.5 border-b border-gray-200">
                    <div>Ürün Adı</div>
                    <div className="text-center">Adet</div>
                    <div className="text-center">İndirim</div>
                    <div className="text-center">Tutar</div>
                    <div>Not</div>
                  </div>
                  <div className="divide-y divide-gray-200 max-h-[20vh] overflow-y-auto">
                    <div className="grid grid-cols-5 gap-1 p-1.5 bg-white/60">
                      <div className="font-medium text-xs text-gray-900">Migros Özel Kuşbaşı Menü</div>
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs text-gray-500">0,00 ₺</div>
                      <div className="text-center font-medium text-xs text-gray-900">279,00 ₺</div>
                      <div className="text-xs text-gray-500">-</div>
                    </div>
                    <div className="grid grid-cols-5 gap-1 p-1.5 bg-gray-50/60">
                      <div className="pl-2 text-xs text-gray-600">PKT ÇORBA</div>
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs text-gray-500">0,00 ₺</div>
                      <div className="text-center text-xs text-gray-500">0,00 ₺</div>
                      <div className="text-xs text-gray-500">-</div>
                    </div>
                    <div className="grid grid-cols-5 gap-1 p-1.5 bg-gray-50/60">
                      <div className="pl-2 text-xs text-gray-600">PKT KUŞBAŞILI PİDE TEK</div>
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs text-gray-500">0,00 ₺</div>
                      <div className="text-center text-xs text-gray-500">0,00 ₺</div>
                      <div className="text-xs text-gray-500">-</div>
                    </div>
                    <div className="grid grid-cols-5 gap-1 p-1.5 bg-gray-50/60">
                      <div className="pl-2 text-xs text-gray-600">ROKA SALATA</div>
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs text-gray-500">10,00 ₺</div>
                      <div className="text-center text-xs text-gray-500">10,00 ₺</div>
                      <div className="text-xs text-gray-500">-</div>
                    </div>
                    <div className="grid grid-cols-5 gap-1 p-1.5 bg-gray-50/60">
                      <div className="pl-2 text-xs text-gray-600">AYRAN</div>
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs text-gray-500">0,00 ₺</div>
                      <div className="text-center text-xs text-gray-500">0,00 ₺</div>
                      <div className="text-xs text-gray-500">-</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};