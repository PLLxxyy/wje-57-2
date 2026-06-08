import RecipeGrid from '@/components/RecipeGrid';
import { useCoffeeStore } from '@/store/useCoffeeStore';

export default function HistoryPage() {
  const { history } = useCoffeeStore();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">
            📜 生成历史
          </h2>
          <p className="text-amber-600 text-sm">
            回顾每一杯曾经调配过的特调咖啡
          </p>
        </div>

        <RecipeGrid recipes={history} type="history" />
      </div>
    </div>
  );
}
