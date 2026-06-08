import { useCoffeeStore } from '@/store/useCoffeeStore';
import { CardStyle } from '@/types';

const styles: { id: CardStyle; label: string; icon: string }[] = [
  { id: 'vintage', label: '复古菜单', icon: '📜' },
  { id: 'minimalist', label: '极简白卡', icon: '▢' },
  { id: 'midnight', label: '深夜咖啡馆', icon: '🌙' },
  { id: 'spring', label: '春日野餐', icon: '🌸' },
];

export default function StyleSwitcher() {
  const { currentStyle, setCurrentStyle, currentCard } = useCoffeeStore();

  if (!currentCard) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => setCurrentStyle(style.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            currentStyle === style.id
              ? 'bg-amber-600 text-white shadow-lg scale-105'
              : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
          }`}
        >
          <span>{style.icon}</span>
          <span>{style.label}</span>
        </button>
      ))}
    </div>
  );
}
