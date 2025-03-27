import { 
  ShoppingCart, 
  Store, 
  User, 
  FileText, 
  MapPin, 
  DollarSign, 
  Clock, 
  Timer, 
  Info, 
  CheckCircle 
} from "lucide-react";

export const TableHeader = () => (
  <div className="grid grid-cols-9 px-6 py-4 text-sm font-medium tracking-wide bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-md backdrop-blur-md relative z-10">
    {/* Animated gradient border */}
    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x"></div>
    
    {/* Shadow for sticky header */}
    <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-black/5 to-transparent"></div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-blue-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-blue-200 shadow-sm">
        <ShoppingCart className="h-4 w-4 text-blue-600 transition-all duration-300 group-hover:text-blue-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-blue-700 font-semibold">Platform</span>
    </div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-green-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-green-200 shadow-sm">
        <User className="h-4 w-4 text-green-600 transition-all duration-300 group-hover:text-green-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-green-700 font-semibold">Müşteri</span>
    </div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-yellow-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-yellow-200 shadow-sm">
        <FileText className="h-4 w-4 text-yellow-600 transition-all duration-300 group-hover:text-yellow-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-yellow-700 font-semibold">Not</span>
    </div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-orange-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-orange-200 shadow-sm">
        <MapPin className="h-4 w-4 text-orange-600 transition-all duration-300 group-hover:text-orange-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-orange-700 font-semibold">Adres</span>
    </div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-red-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-red-200 shadow-sm">
        <DollarSign className="h-4 w-4 text-red-600 transition-all duration-300 group-hover:text-red-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-red-700 font-semibold">Tutar</span>
    </div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-indigo-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-indigo-200 shadow-sm">
        <Clock className="h-4 w-4 text-indigo-600 transition-all duration-300 group-hover:text-indigo-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-indigo-700 font-semibold">Sipariş saati</span>
    </div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-pink-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-pink-200 shadow-sm">
        <Timer className="h-4 w-4 text-pink-600 transition-all duration-300 group-hover:text-pink-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-pink-700 font-semibold">Geçen süre</span>
    </div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-cyan-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-cyan-200 shadow-sm">
        <Info className="h-4 w-4 text-cyan-600 transition-all duration-300 group-hover:text-cyan-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-cyan-700 font-semibold">Detay</span>
    </div>
    
    <div className="flex items-center gap-2 relative group">
      <div className="flex items-center justify-center bg-emerald-100 w-8 h-8 rounded-lg transition-all duration-300 group-hover:bg-emerald-200 shadow-sm">
        <CheckCircle className="h-4 w-4 text-emerald-600 transition-all duration-300 group-hover:text-emerald-700" />
      </div>
      <span className="transition-all duration-300 group-hover:text-emerald-700 font-semibold">Durum</span>
    </div>
  </div>
);