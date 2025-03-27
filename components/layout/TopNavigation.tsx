import { Button } from "@/components/ui/button";
import { ShoppingCart, Building2, History, LayoutDashboard, Menu, LogOut } from "lucide-react";
import Link from "next/link";

export const TopNavigation = () => {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 h-16 flex items-center px-6 justify-end shadow-md">
      <div className="flex items-center gap-3 mr-auto">
        <div className="bg-gray-800/10 p-2 rounded-lg backdrop-blur-sm hover:bg-gray-800/20 transition-colors cursor-pointer">
          <Menu className="h-6 w-6 text-gray-700" />
        </div>
        <span className="text-xl font-semibold tracking-wide text-gray-800">robotpos platform manager</span>
      </div>

      <div className="flex items-center gap-2 mr-4">
        <Link href="/">
          <Button variant="ghost" className="nav-button text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-all">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Ana Sayfa
          </Button>
        </Link>
       
        <Link href="/gecmis">
          <Button variant="ghost" className="nav-button text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-all">
            <History className="h-5 w-5 mr-2" />
            Geçmiş Siparişler
          </Button>
        </Link>
      
        <Link href="/menu-yonetimi">
          <Button variant="ghost" className="nav-button text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-all">
            <Menu className="h-5 w-5 mr-2" />
            Menü Yönetimi
          </Button>
        </Link>
      </div>

      <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-100 transition-all flex items-center">
        <LogOut className="h-5 w-5 mr-2" />
        Çıkış
      </Button>
    </div>
  );
}