"use client";

import { useState } from "react";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { 
  Search, 
  Calendar, 
  Filter, 
  ShoppingBag, 
  Info, 
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  User,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { OrderDetails } from "@/components/orders/OrderDetails";

// Sipariş durumu için tip tanımı
type OrderStatus = 'onay_bekleniyor' | 'onaylandi' | 'iptal_edildi' | 'teslim_edildi';

// Sipariş için tip tanımı
interface Order {
  id: number;
  platform: string;
  customer: string;
  note?: string;
  amount: number;
  orderTime: string;
  orderDate: string;
  status: OrderStatus;
}

// Örnek sipariş verileri
const mockOrders: Order[] = [
  {
    id: 1,
    platform: "Migros Yemek",
    customer: "Berk Çağlar",
    amount: 289.00,
    orderTime: "13:46",
    orderDate: "15.11.2024",
    status: "onay_bekleniyor"
  },
  {
    id: 2,
    platform: "Migros Yemek",
    customer: "Berk Çağlar",
    amount: 289.00,
    orderTime: "13:46",
    orderDate: "15.11.2024",
    status: "onay_bekleniyor"
  },
  {
    id: 3,
    platform: "Migros Yemek",
    customer: "Ebrar Karabastık",
    amount: 308.00,
    orderTime: "18:48",
    orderDate: "02.09.2024",
    status: "onay_bekleniyor"
  },
  {
    id: 4,
    platform: "Yemek Sepeti",
    customer: "Ebrar Karabastık",
    amount: 308.00,
    orderTime: "18:48",
    orderDate: "02.09.2024",
    status: "onay_bekleniyor"
  },
  {
    id: 5,
    platform: "Migros Yemek",
    customer: "Hakan BOZTEPE",
    amount: 164.00,
    orderTime: "12:55",
    orderDate: "23.10.2024",
    status: "iptal_edildi"
  },
  {
    id: 6,
    platform: "Getir",
    customer: "Ahmet Yılmaz",
    amount: 225.50,
    orderTime: "14:30",
    orderDate: "20.10.2024",
    status: "onaylandi"
  },
  {
    id: 7,
    platform: "Yemek Sepeti",
    customer: "Mehmet Demir",
    note: "Kapıda kredi kartı ile ödeme",
    amount: 175.25,
    orderTime: "19:15",
    orderDate: "18.10.2024",
    status: "teslim_edildi"
  }
];

// Platform seçenekleri
const platformOptions = [
  { value: "", label: "Tüm Platformlar", icon: <ShoppingBag className="h-4 w-4" /> },
  { value: "Getir", label: "Getir", color: "purple", icon: <span className="text-purple-600 font-bold">G</span> },
  { value: "Yemek Sepeti", label: "Yemek Sepeti", color: "red", icon: <span className="text-red-600 font-bold">Y</span> },
  { value: "Migros Yemek", label: "Migros Yemek", color: "blue", icon: <span className="text-blue-600 font-bold">M</span> },
  { value: "Trendyol", label: "Trendyol", color: "orange", icon: <span className="text-orange-600 font-bold">T</span> }
];

// Durum seçenekleri
const statusOptions = [
  { value: "", label: "Tüm Durumlar", icon: <Filter className="h-4 w-4" /> },
  { value: "onay_bekleniyor", label: "Onay Bekliyor", color: "amber", icon: <Clock className="h-4 w-4 text-amber-600" /> },
  { value: "onaylandi", label: "Onaylandı", color: "green", icon: <CheckCircle className="h-4 w-4 text-green-600" /> },
  { value: "iptal_edildi", label: "İptal Edildi", color: "red", icon: <XCircle className="h-4 w-4 text-red-600" /> },
  { value: "teslim_edildi", label: "Teslim Edildi", color: "purple", icon: <ShoppingBag className="h-4 w-4 text-purple-600" /> }
];

export default function GecmisSiparisler() {
  // Filtre durumları
  const [startDate, setStartDate] = useState("01.09.2024");
  const [endDate, setEndDate] = useState("26.03.2025");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  
  // Arama durumları
  const [platformSearch, setPlatformSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [amountSearch, setAmountSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  
  // Filtrelenmiş siparişler
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  
  // Sipariş detay modalı için state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Sipariş detayını göster
  const showOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };
  
  // Sipariş detay modalını kapat
  const closeOrderDetails = () => {
    setIsDetailModalOpen(false);
  };

  // Filtreleme fonksiyonu
  const handleFilter = () => {
    let result = mockOrders;
    
    // Tarih filtresi
    if (startDate && endDate) {
      // Gerçek uygulamada tarih karşılaştırması yapılmalı
      // Bu örnek için basitleştirilmiş
    }
    
    // Durum filtresi
    if (selectedStatus) {
      result = result.filter(order => order.status === selectedStatus);
    }
    
    // Platform filtresi
    if (selectedPlatform) {
      result = result.filter(order => order.platform === selectedPlatform);
    }
    
    // Arama filtreleri
    if (platformSearch) {
      result = result.filter(order => 
        order.platform.toLowerCase().includes(platformSearch.toLowerCase())
      );
    }
    
    if (customerSearch) {
      result = result.filter(order => 
        order.customer.toLowerCase().includes(customerSearch.toLowerCase())
      );
    }
    
    if (amountSearch) {
      result = result.filter(order => 
        order.amount.toString().includes(amountSearch)
      );
    }
    
    if (dateSearch) {
      result = result.filter(order => 
        order.orderDate.includes(dateSearch) || order.orderTime.includes(dateSearch)
      );
    }
    
    setFilteredOrders(result);
  };
  
  // Filtreleri sıfırlama
  const resetFilters = () => {
    setStartDate("01.09.2024");
    setEndDate("26.03.2025");
    setSelectedStatus("");
    setSelectedPlatform("");
    setPlatformSearch("");
    setCustomerSearch("");
    setAmountSearch("");
    setDateSearch("");
    setFilteredOrders(mockOrders);
  };
  
  // Sipariş durumuna göre stil ve metin
  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'onay_bekleniyor':
        return {
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-800',
          icon: <Clock className="h-4 w-4 mr-1.5" />,
          text: 'Onay Bekliyor'
        };
      case 'onaylandi':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: <CheckCircle className="h-4 w-4 mr-1.5" />,
          text: 'Onaylandı'
        };
      case 'iptal_edildi':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: <XCircle className="h-4 w-4 mr-1.5" />,
          text: 'Müşteriden İptal'
        };
      case 'teslim_edildi':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          icon: <ShoppingBag className="h-4 w-4 mr-1.5" />,
          text: 'Teslim Edildi'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: null,
          text: 'Bilinmiyor'
        };
    }
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50"></div>
      
      {/* Content with relative positioning to appear above the background */}
      <div className="relative z-10">
        <TopNavigation />
        
        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Başlık */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Geçmiş Siparişler</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
              <ExternalLink className="h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </div>
          
          {/* Filtreler */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-md p-5 border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg shadow-sm">
                  <SlidersHorizontal className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Sipariş Filtreleri</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{filteredOrders.length} sipariş listeleniyor</span>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-200 transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  Sıfırla
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Başlangıç Tarihi */}
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Başlangıç Tarihi</label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate.split('.').reverse().join('-')}
                    onChange={(e) => {
                      // Convert YYYY-MM-DD to DD.MM.YYYY
                      const dateValue = e.target.value;
                      if (dateValue) {
                        const [year, month, day] = dateValue.split('-');
                        setStartDate(`${day}.${month}.${year}`);
                      } else {
                        setStartDate("");
                      }
                    }}
                    className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
              </div>
              
              {/* Bitiş Tarihi */}
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bitiş Tarihi</label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate.split('.').reverse().join('-')}
                    onChange={(e) => {
                      // Convert YYYY-MM-DD to DD.MM.YYYY
                      const dateValue = e.target.value;
                      if (dateValue) {
                        const [year, month, day] = dateValue.split('-');
                        setEndDate(`${day}.${month}.${year}`);
                      } else {
                        setEndDate("");
                      }
                    }}
                    className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
              </div>
              
              {/* Durum */}
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sipariş Durumu</label>
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Filter className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
                
                {/* Status chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {statusOptions.slice(1).map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedStatus(option.value === selectedStatus ? "" : option.value)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedStatus === option.value
                          ? `bg-${option.color}-500 text-white`
                          : `bg-${option.color}-100 text-${option.color}-700 hover:bg-${option.color}-200`
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Pazaryeri */}
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pazaryeri</label>
                <div className="relative">
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {platformOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Filter className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
                
                {/* Platform chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {platformOptions.slice(1).map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedPlatform(option.value === selectedPlatform ? "" : option.value)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedPlatform === option.value
                          ? `bg-${option.color}-500 text-white`
                          : `bg-${option.color}-100 text-${option.color}-700 hover:bg-${option.color}-200`
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Arama alanları */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Müşteri Ara..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 pl-9 pr-3 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tutar Ara..."
                  value={amountSearch}
                  onChange={(e) => setAmountSearch(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 pl-9 pr-3 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tarih/Saat Ara..."
                  value={dateSearch}
                  onChange={(e) => setDateSearch(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 pl-9 pr-3 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <button
                onClick={handleFilter}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtreleri Uygula
              </button>
            </div>
          </div>
          
          {/* Sipariş Tablosu */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200/50">
            <div className="grid grid-cols-7 px-6 py-3 text-sm font-medium tracking-wide bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg shadow-sm">
                  <ShoppingBag className="h-4 w-4 text-blue-600" />
                </div>
                <span>Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-lg shadow-sm">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <span>Müşteri</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-lg shadow-sm">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <span>Sipariş Zamanı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-2 rounded-lg shadow-sm">
                  <Calendar className="h-4 w-4 text-amber-600" />
                </div>
                <span>Sipariş Tarihi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-lg shadow-sm">
                  <DollarSign className="h-4 w-4 text-red-600" />
                </div>
                <span>Tutar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-cyan-100 p-2 rounded-lg shadow-sm">
                  <Filter className="h-4 w-4 text-cyan-600" />
                </div>
                <span>Durum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-lg shadow-sm">
                  <Info className="h-4 w-4 text-emerald-600" />
                </div>
                <span>İşlemler</span>
              </div>
            </div>
            
            {/* Sipariş Satırları */}
            <div className="divide-y divide-gray-100">
              {filteredOrders.map((order, index) => {
                const status = getStatusStyle(order.status);
                
                return (
                  <div key={order.id} className={`grid grid-cols-7 px-6 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/80'} hover:bg-blue-50/30 transition-colors`}>
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${
                        order.platform === "Getir" 
                          ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white" 
                          : order.platform === "Yemek Sepeti"
                            ? "bg-gradient-to-br from-red-500 to-red-700 text-white"
                            : "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
                      }`}>
                        <span className="text-sm font-bold">
                          {order.platform === "Getir" ? "G" : order.platform === "Yemek Sepeti" ? "Y" : "M"}
                        </span>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{order.platform}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">{order.customer}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">{order.orderTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">{order.orderDate}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{order.amount.toFixed(2)} ₺</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`flex items-center px-2.5 py-1 rounded-full ${status.bgColor} ${status.textColor} text-xs font-medium`}>
                        {status.icon}
                        {status.text}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-1.5 rounded-md shadow-sm hover:shadow-md transition-all"
                        onClick={() => showOrderDetails(order)}
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      
                      <button className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white p-1.5 rounded-md shadow-sm hover:shadow-md transition-all">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              
              {filteredOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Sipariş Bulunamadı</h3>
                  <p className="text-gray-500 mt-2 max-w-md">Seçtiğiniz filtrelere uygun sipariş bulunamadı. Lütfen farklı filtreler ile tekrar deneyin.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Filtreleri Sıfırla
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sipariş Detay Modalı */}
      {selectedOrder && (
        <OrderDetails 
          isOpen={isDetailModalOpen} 
          onClose={closeOrderDetails} 
          order={{
            ...selectedOrder,
            // OrderDetails bileşeninin beklediği status formatına dönüştürme
            status: selectedOrder.status === 'onay_bekleniyor' 
              ? 'pending' 
              : selectedOrder.status === 'onaylandi' 
                ? 'approved' 
                : selectedOrder.status === 'teslim_edildi' 
                  ? 'delivered' 
                  : selectedOrder.status === 'iptal_edildi' 
                    ? 'cancelled' 
                    : 'pending'
          }} 
        />
      )}
    </div>
  );
}
