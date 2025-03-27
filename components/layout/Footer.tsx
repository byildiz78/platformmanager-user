import { Wifi, WifiOff, Clock, Server, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastChecked, setLastChecked] = useState(new Date());
  const [serverStatus, setServerStatus] = useState<"online" | "warning" | "offline">("online");

  // Bağlantı durumunu simüle etmek için
  useEffect(() => {
    const interval = setInterval(() => {
      // Gerçek uygulamada burada API çağrısı yapılabilir
      setLastChecked(new Date());
      
      // Rastgele bağlantı durumu (demo amaçlı)
      if (Math.random() > 0.9) {
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 3000);
      }
      
      // Rastgele sunucu durumu (demo amaçlı)
      const random = Math.random();
      if (random > 0.9) {
        setServerStatus("offline");
      } else if (random > 0.7) {
        setServerStatus("warning");
      } else {
        setServerStatus("online");
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Tarih formatını düzenleyen yardımcı fonksiyon
  const formatDate = (date: Date) => {
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <footer className="sticky bottom-0 left-0 right-0 bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-200 shadow-md py-2 px-6 z-50">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-6">
          {/* Bağlantı Durumu */}
          <div className="flex items-center gap-1.5">
            {isConnected ? (
              <Wifi className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <WifiOff className="h-3.5 w-3.5 text-red-600" />
            )}
            <span>{isConnected ? "Bağlantı Aktif" : "Bağlantı Kesildi"}</span>
          </div>
          
          {/* Sunucu Durumu */}
          <div className="flex items-center gap-1.5">
            <Server className={`h-3.5 w-3.5 ${
              serverStatus === "online" 
                ? "text-green-600" 
                : serverStatus === "warning" 
                  ? "text-amber-600" 
                  : "text-red-600"
            }`} />
            <span>
              {serverStatus === "online" 
                ? "Sunucu Çevrimiçi" 
                : serverStatus === "warning" 
                  ? "Sunucu Yavaş" 
                  : "Sunucu Çevrimdışı"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Son Kontrol Zamanı */}
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-blue-600" />
            <span>Son Kontrol: {formatDate(lastChecked)}</span>
          </div>
          
          {/* Versiyon Bilgisi */}
          <div className="flex items-center gap-1.5 bg-gray-800/5 px-2 py-1 rounded-md">
            <span className="text-gray-700 font-medium">v1.0.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
