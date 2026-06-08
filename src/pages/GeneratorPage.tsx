import CoffeeCard from '@/components/CoffeeCard/CoffeeCard';
import StyleSwitcher from '@/components/StyleSwitcher';
import ActionButtons from '@/components/ActionButtons';

export default function GeneratorPage() {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">
            ✨ 今日特调 ✨
          </h2>
          <p className="text-amber-600 text-sm">
            每一杯都是独一无二的创意配方
          </p>
        </div>

        <StyleSwitcher />

        <div 
          className="w-full aspect-[3/4] mb-6"
          style={{ minHeight: '520px' }}
        >
          <CoffeeCard />
        </div>

        <ActionButtons />
      </div>
    </div>
  );
}
