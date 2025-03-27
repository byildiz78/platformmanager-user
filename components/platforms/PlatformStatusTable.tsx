import { useState } from 'react';
import { Store, Clock, User, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';

type PlatformStatus = 'açık' | 'yoğun' | 'kapalı';
type CourierStatus = 'açık' | 'kapalı';

interface PlatformData {
  name: string;
  restaurantStatus: PlatformStatus;
  courierStatus?: CourierStatus;
  pendingOrders: number;
}

const platformsData: PlatformData[] = [
  {
    name: 'Getir',
    restaurantStatus: 'açık',
    courierStatus: 'açık',
    pendingOrders: 3
  },
  {
    name: 'Yemek Sepeti',
    restaurantStatus: 'açık',
    pendingOrders: 2
  },
  {
    name: 'Migros Yemek',
    restaurantStatus: 'yoğun',
    pendingOrders: 1
  },
  {
    name: 'Trendyol',
    restaurantStatus: 'kapalı',
    pendingOrders: 0
  }
];

export const PlatformStatusTable = () => {
  const [platforms, setPlatforms] = useState<PlatformData[]>(platformsData);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (platformName: string, newStatus: PlatformStatus) => {
    setPlatforms(platforms.map(platform => {
      if (platform.name === platformName) {
        return {
          ...platform,
          restaurantStatus: newStatus
        };
      }
      return platform;
    }));
  };

  const handleCourierStatusChange = (platformName: string, newStatus: CourierStatus) => {
    setPlatforms(platforms.map(platform => {
      if (platform.name === platformName) {
        return {
          ...platform,
          courierStatus: newStatus
        };
      }
      return platform;
    }));
  };

  const getStatusColor = (status: PlatformStatus | CourierStatus) => {
    switch (status) {
      case 'açık':
        return 'text-green-600';
      case 'yoğun':
        return 'text-amber-500';
      case 'kapalı':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBgColor = (status: PlatformStatus | CourierStatus) => {
    switch (status) {
      case 'açık':
        return 'bg-green-100 border-green-200';
      case 'yoğun':
        return 'bg-amber-100 border-amber-200';
      case 'kapalı':
        return 'bg-red-100 border-red-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  // Platform durumlarının özeti
  const activePlatforms = platforms.filter(p => p.restaurantStatus === 'açık');
  const busyPlatforms = platforms.filter(p => p.restaurantStatus === 'yoğun');
  const inactivePlatforms = platforms.filter(p => p.restaurantStatus === 'kapalı');
  const totalPendingOrders = platforms.reduce((total, platform) => total + platform.pendingOrders, 0);

  return (
    <div className="bg-white/90 rounded-lg shadow-md backdrop-blur-sm p-4 mb-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-gray-700" />
          <h2 className="text-lg font-semibold">Platform Durumları</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {activePlatforms.map(platform => (
              <span key={`${platform.name}-active`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {platform.name} Açık
              </span>
            ))}
            
            {busyPlatforms.map(platform => (
              <span key={`${platform.name}-busy`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                {platform.name} Yoğun
              </span>
            ))}
            
            {inactivePlatforms.map(platform => (
              <span key={`${platform.name}-inactive`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {platform.name} Kapalı
              </span>
            ))}
            
            {totalPendingOrders > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Clock className="mr-1 h-3 w-3" />
                {totalPendingOrders} Bekleyen
              </span>
            )}
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Gizle</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Göster</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="overflow-x-auto mt-3 border-t pt-3">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restoran</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kurye</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bekleyen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {platforms.map((platform) => (
                <tr key={platform.name} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{platform.name}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleStatusChange(platform.name, 'açık')}
                        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border ${
                          platform.restaurantStatus === 'açık' 
                            ? 'bg-green-100 border-green-200 text-green-700' 
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`h-2 w-2 rounded-full ${platform.restaurantStatus === 'açık' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        Açık
                      </button>
                      <button
                        onClick={() => handleStatusChange(platform.name, 'yoğun')}
                        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border ${
                          platform.restaurantStatus === 'yoğun' 
                            ? 'bg-amber-100 border-amber-200 text-amber-700' 
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`h-2 w-2 rounded-full ${platform.restaurantStatus === 'yoğun' ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                        Yoğun
                      </button>
                      <button
                        onClick={() => handleStatusChange(platform.name, 'kapalı')}
                        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border ${
                          platform.restaurantStatus === 'kapalı' 
                            ? 'bg-red-100 border-red-200 text-red-700' 
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`h-2 w-2 rounded-full ${platform.restaurantStatus === 'kapalı' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                        Kapalı
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {platform.courierStatus !== undefined ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleCourierStatusChange(platform.name, 'açık')}
                          className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border ${
                            platform.courierStatus === 'açık' 
                              ? 'bg-green-100 border-green-200 text-green-700' 
                              : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <div className={`h-2 w-2 rounded-full ${platform.courierStatus === 'açık' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          Açık
                        </button>
                        <button
                          onClick={() => handleCourierStatusChange(platform.name, 'kapalı')}
                          className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border ${
                            platform.courierStatus === 'kapalı' 
                              ? 'bg-red-100 border-red-200 text-red-700' 
                              : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <div className={`h-2 w-2 rounded-full ${platform.courierStatus === 'kapalı' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                          Kapalı
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">Kullanılmıyor</span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        platform.pendingOrders > 0 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <Clock className="mr-1 h-3 w-3" />
                        {platform.pendingOrders}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
