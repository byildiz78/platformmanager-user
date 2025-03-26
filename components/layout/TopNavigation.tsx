import { Button } from "@/components/ui/button";
import { ShoppingCart, Building2, History, LayoutDashboard, Menu, LogOut } from "lucide-react";

export const TopNavigation = () => {
  return (
    <div className="bg-gradient-to-r from-[#2c3e50] to-[#3a506b] text-white h-16 flex items-center px-6 justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
          <Menu className="h-6 w-6" />
        </div>
        <span className="text-xl font-semibold tracking-wide">robotpos automation</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" className="nav-button text-white hover:text-white hover:bg-white/10">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Siparişler
        </Button>
        <Button variant="ghost" className="nav-button text-white hover:text-white hover:bg-white/10">
          <Building2 className="h-5 w-5 mr-2" />
          Şube Yönetimi
        </Button>
        <Button variant="ghost" className="nav-button text-white hover:text-white hover:bg-white/10">
          <History className="h-5 w-5 mr-2" />
          Geçmiş Siparişler
        </Button>
        <Button variant="ghost" className="nav-button text-white hover:text-white hover:bg-white/10">
          <LayoutDashboard className="h-5 w-5 mr-2" />
          Dashboard
        </Button>
        <Button variant="ghost" className="nav-button text-white hover:text-white hover:bg-white/10">
          <Menu className="h-5 w-5 mr-2" />
          Menü Yönetimi
        </Button>
      </div>

      <Button variant="ghost" className="text-white hover:text-white hover:bg-red-500/20 transition-colors">
        <LogOut className="h-5 w-5 mr-2" />
        Çıkış
      </Button>
    </div>
  );
};