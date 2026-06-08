import { useCoffeeStore } from '@/store/useCoffeeStore';
import VintageMenu from './styles/VintageMenu';
import Minimalist from './styles/Minimalist';
import MidnightCafe from './styles/MidnightCafe';
import SpringPicnic from './styles/SpringPicnic';

export default function CoffeeCard() {
  const { currentCard, isGenerating } = useCoffeeStore();

  if (!currentCard) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-dashed border-amber-200">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">☕</div>
          <h2 className="text-xl font-semibold text-amber-800 mb-2">
            准备好一杯特调了吗？
          </h2>
          <p className="text-amber-600 text-sm">
            点击下方按钮，生成专属于你的虚构咖啡配方
          </p>
        </div>
      </div>
    );
  }

  const renderCardByStyle = () => {
    switch (currentCard.style) {
      case 'vintage':
        return <VintageMenu data={currentCard} />;
      case 'minimalist':
        return <Minimalist data={currentCard} />;
      case 'midnight':
        return <MidnightCafe data={currentCard} />;
      case 'spring':
        return <SpringPicnic data={currentCard} />;
      default:
        return <VintageMenu data={currentCard} />;
    }
  };

  return (
    <div 
      id="coffee-card"
      className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
        isGenerating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {isGenerating ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-amber-200 rounded-full animate-ping" />
              <div className="absolute inset-2 border-4 border-amber-400 rounded-full animate-spin border-t-transparent" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">☕</div>
            </div>
            <p className="text-amber-700 font-medium">正在调配特调...</p>
          </div>
        </div>
      ) : (
        renderCardByStyle()
      )}
    </div>
  );
}
