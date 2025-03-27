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
  ExternalLink
} from "lucide-react";
import Link from "next/link";

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
  { value: "", label: "Seçiniz" },
  { value: "Getir", label: "Getir" },
  { value: "Yemek Sepeti", label: "Yemek Sepeti" },
  { value: "Migros Yemek", label: "Migros Yemek" },
  { value: "Trendyol", label: "Trendyol" }
];

// Durum seçenekleri
const statusOptions = [
  { value: "", label: "Seçiniz" },
  { value: "onay_bekleniyor", label: "Onay Bekliyor" },
  { value: "onaylandi", label: "Onaylandı" },
  { value: "iptal_edildi", label: "İptal Edildi" },
  { value: "teslim_edildi", label: "Teslim Edildi" }
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
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-white mb-3">Sipariş Filtreleri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Başlangıç Tarihi */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Başlangıç Tarihi</label>
                <div className="relative">
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Bitiş Tarihi */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Bitiş Tarihi</label>
                <div className="relative">
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Durum */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Durum</label>
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm appearance-none"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Pazaryeri */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Pazaryeri</label>
                <div className="relative">
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm appearance-none"
                  >
                    {platformOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Butonlar */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md text-sm font-medium transition-colors"
              >
                Sıfırla
              </button>
              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                Filtrele
              </button>
            </div>
          </div>
          
          {/* Sipariş Tablosu */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 font-semibold">
              Geçmiş Siparişler
            </h2>
            
            {/* Tablo */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Platform</span>
                        <div className="relative">
                          <input
                            type="text"
                            value={platformSearch}
                            onChange={(e) => setPlatformSearch(e.target.value)}
                            placeholder="Ara..."
                            className="ml-2 p-1 text-xs border border-gray-300 rounded w-24"
                          />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Müşteri</span>
                        <div className="relative">
                          <input
                            type="text"
                            value={customerSearch}
                            onChange={(e) => setCustomerSearch(e.target.value)}
                            placeholder="Ara..."
                            className="ml-2 p-1 text-xs border border-gray-300 rounded w-24"
                          />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sipariş Notu
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Tutar</span>
                        <div className="relative">
                          <input
                            type="text"
                            value={amountSearch}
                            onChange={(e) => setAmountSearch(e.target.value)}
                            placeholder="Ara..."
                            className="ml-2 p-1 text-xs border border-gray-300 rounded w-24"
                          />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Tarih</span>
                        <div className="relative">
                          <input
                            type="text"
                            value={dateSearch}
                            onChange={(e) => setDateSearch(e.target.value)}
                            placeholder="Ara..."
                            className="ml-2 p-1 text-xs border border-gray-300 rounded w-24"
                          />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detay
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const statusStyle = getStatusStyle(order.status);
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {order.platform}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {order.note ? (
                            <div className="flex items-center">
                              <Info className="h-4 w-4 text-blue-500 mr-1" />
                              <span>{order.note}</span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {order.amount.toFixed(2)} ₺
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {order.orderDate} {order.orderTime}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <button className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            <Search className="h-4 w-4" />
                          </button>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bgColor} ${statusStyle.textColor}`}>
                            {statusStyle.icon}
                            {statusStyle.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Boş durum */}
            {filteredOrders.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">Filtrelere uygun sipariş bulunamadı.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
