"use client";

import { useState } from "react";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { 
  Search, 
  Filter, 
  ExternalLink,
  Edit,
  Trash,
  Eye,
  Plus,
  Tag
} from "lucide-react";
import Link from "next/link";

// Platform seçenekleri
const platformOptions = [
  { value: "", label: "Tümü" },
  { value: "Getir", label: "Getir" },
  { value: "Yemek Sepeti", label: "Yemek Sepeti" },
  { value: "Migros Yemek", label: "Migros Yemek" },
  { value: "Trendyol", label: "Trendyol" }
];

// Durum seçenekleri
const statusOptions = [
  { value: "", label: "Tümü" },
  { value: "aktif", label: "Aktif" },
  { value: "pasif", label: "Pasif" }
];

// Ürün için tip tanımı
interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  platform: string;
  status: 'aktif' | 'pasif';
  imageUrl?: string;
}

// Örnek ürün verileri
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Tavuk Döner",
    description: "Özel soslu tavuk döner",
    price: 75.90,
    platform: "Getir",
    status: "aktif"
  },
  {
    id: 2,
    name: "Adana Kebap",
    description: "Acılı Adana kebap porsiyon",
    price: 120.00,
    platform: "Yemek Sepeti",
    status: "aktif"
  },
  {
    id: 3,
    name: "İskender",
    description: "Tereyağlı iskender porsiyon",
    price: 110.00,
    platform: "Migros Yemek",
    status: "pasif"
  },
  {
    id: 4,
    name: "Lahmacun",
    description: "Fırında acılı lahmacun",
    price: 35.00,
    platform: "Trendyol",
    status: "aktif"
  },
  {
    id: 5,
    name: "Pide",
    description: "Kaşarlı pide",
    price: 65.00,
    platform: "Getir",
    status: "pasif"
  },
  {
    id: 6,
    name: "Ayran",
    price: 15.00,
    platform: "Yemek Sepeti",
    status: "aktif"
  },
  {
    id: 7,
    name: "Künefe",
    description: "Antep fıstıklı künefe",
    price: 85.00,
    platform: "Migros Yemek",
    status: "aktif"
  }
];

export default function MenuYonetimi() {
  // Filtre durumları
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  
  // Filtrelenmiş ürünler
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  
  // Filtreleme fonksiyonu
  const handleFilter = () => {
    let result = mockProducts;
    
    // Durum filtresi
    if (selectedStatus) {
      result = result.filter(product => product.status === selectedStatus);
    }
    
    // Platform filtresi
    if (selectedPlatform) {
      result = result.filter(product => product.platform === selectedPlatform);
    }
    
    // ID arama filtresi
    if (idSearch) {
      result = result.filter(product => 
        product.id.toString().includes(idSearch)
      );
    }
    
    // İsim arama filtresi
    if (nameSearch) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  };
  
  // Filtreleri sıfırlama
  const resetFilters = () => {
    setSelectedStatus("");
    setSelectedPlatform("");
    setIdSearch("");
    setNameSearch("");
    setFilteredProducts(mockProducts);
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
            <h1 className="text-2xl font-bold text-gray-800">Menü Yönetimi</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
              <ExternalLink className="h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </div>
          
          {/* Filtreler */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ID ile ara */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID ile ara</label>
                <div className="relative">
                  <input
                    type="text"
                    value={idSearch}
                    onChange={(e) => setIdSearch(e.target.value)}
                    placeholder="ID ile ara..."
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* İsim ile ara */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İsim ile ara</label>
                <div className="relative">
                  <input
                    type="text"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    placeholder="İsim ile ara..."
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-800 text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
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
            
            {/* Durum ve butonlar */}
            <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedStatus("");
                      handleFilter();
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 ${
                      selectedStatus === "" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Tümü
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedStatus("aktif");
                      handleFilter();
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 ${
                      selectedStatus === "aktif" 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Aktif
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedStatus("pasif");
                      handleFilter();
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 ${
                      selectedStatus === "pasif" 
                        ? "bg-red-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pasif
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2 items-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
                >
                  Sıfırla
                </button>
                <button
                  onClick={handleFilter}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Filtrele
                </button>
                <button
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Yeni Ürün
                </button>
              </div>
            </div>
          </div>
          
          {/* Ürün Tablosu */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ürün Bilgisi
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                            {product.imageUrl ? (
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <div className="text-gray-400 text-xs">Resim Yok</div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{product.description || "-"}</div>
                            <div className="flex items-center mt-1">
                              <Tag className="h-3 w-3 text-blue-500 mr-1" />
                              <span className="text-xs text-blue-600">{product.platform}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.price.toFixed(2)} ₺</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.status === 'aktif' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'aktif' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Boş durum */}
            {filteredProducts.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">Filtrelere uygun ürün bulunamadı.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
