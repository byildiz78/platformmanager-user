import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export const AddressModal = ({ isOpen, onClose, address }: AddressModalProps) => {
  const [activeTab, setActiveTab] = useState<"bike" | "standard">("bike");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[90vw] w-[90vw] h-[90vh] p-0 overflow-hidden rounded-lg border border-gray-200/50 shadow-xl backdrop-blur-sm bg-white/95 animate-fadeIn"
      >
        {/* Header - Blue bar with title and close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-3 bg-blue-500 text-white">
          <div className="flex items-center space-x-2">
            <MapPin className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Adres Bilgisi</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-0 overflow-auto h-[calc(90vh-48px)]">
          {/* Delivery Point Card */}
          <div className="bg-white p-4 m-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold mr-2">Teslimat Noktası</h3>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Aktif</span>
                </div>
                <p className="text-gray-700 mt-1 text-sm">{address || "Ofis park daire 7, Zafer Mh., Efeler, Aydın, Zafer Mh. 106.sokak No 46 Daire 7 Ofispark Bina No:46 Kat:1 Daire No:7 Efeler/Aydın"}</p>
                
                <div className="flex flex-wrap mt-4 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mr-6 mb-2">
                    <div className="mr-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Mesafe</span>
                      <div className="font-semibold text-gray-700">2.05 km</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Tahmini Süre</span>
                      <div className="font-semibold text-gray-700">3 dk</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Tabs */}
          <div className="flex px-4 space-x-2 mb-2">
            <button
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "bike"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("bike")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13a4 4 0 100 8 4 4 0 000-8zm0 0v-2m0 2h14v-2M5 11h14a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              Bisiklet Rotası
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "standard"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("standard")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Standart Harita
            </button>
          </div>

          {/* Map Container */}
          <div className="mx-4 h-[300px] bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4 relative">
            {/* Leaflet map placeholder - in a real implementation, this would be a Leaflet map component */}
            <div className="absolute inset-0 bg-gray-200">
              <img 
                src="https://a.tile.openstreetmap.org/12/2485/1602.png" 
                alt="Harita" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/800x400?text=Harita+Yükleniyor";
                }}
              />
              
              {/* Blue route line overlay - this is a placeholder for the actual route */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none">
                  <path 
                    d="M200,300 C250,250 300,200 400,180 C500,160 600,200 650,150" 
                    stroke="#2563EB" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeLinecap="round"
                  />
                  <circle cx="200" cy="300" r="8" fill="#EF4444" />
                  <circle cx="650" cy="150" r="8" fill="#10B981" />
                </svg>
              </div>
            </div>
            
            {/* Map Controls */}
            <div className="absolute top-2 right-2 flex flex-col space-y-1">
              <button className="bg-white p-1 rounded shadow hover:bg-gray-100 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="bg-white p-1 rounded shadow hover:bg-gray-100 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Route Information */}
          <div className="px-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Rota Bilgileri
              </h3>
              <div className="bg-gray-100 p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <rect x="7" y="7" width="3" height="3"></rect>
                  <rect x="14" y="7" width="3" height="3"></rect>
                  <rect x="7" y="14" width="3" height="3"></rect>
                  <rect x="14" y="14" width="3" height="3"></rect>
                </svg>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              {/* Route Step 1 - Starting point */}
              <div className="flex items-start mb-4">
                <div className="flex flex-col items-center mr-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium">Rotaya başla</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <div className="flex items-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span>62m</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>1dk</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Route Step 2 */}
              <div className="flex items-start mb-4">
                <div className="flex flex-col items-center mr-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    <span>1</span>
                  </div>
                  <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium">U dönüşü yapın ve devam edin</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <div className="flex items-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span>267m</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>1dk</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Route Step 3 - Final step */}
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                    <span>2</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium">Yolun sonunda sola dön</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <div className="flex items-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span>221m</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>1dk</span>
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
