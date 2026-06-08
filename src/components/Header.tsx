import { Coffee, Heart, Clock, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCoffeeStore } from '@/store/useCoffeeStore';

export default function Header() {
  const location = useLocation();
  const { favorites, history } = useCoffeeStore();

  const navItems = [
    { path: '/', label: '生成器', icon: Sparkles },
    { path: '/favorites', label: '收藏', icon: Heart, count: favorites.length },
    { path: '/history', label: '历史', icon: Clock, count: history.length },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-900">虚构咖啡配方生成器</h1>
              <p className="text-[10px] text-amber-600 -mt-0.5">Creative Coffee Generator</p>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-amber-600 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                      isActive ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {item.count > 99 ? '99+' : item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
