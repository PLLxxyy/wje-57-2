import RecipeGrid from '@/components/RecipeGrid';
import { useCoffeeStore } from '@/store/useCoffeeStore';

export default function FavoritesPage() {
  const { favorites } = useCoffeeStore();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">
            💝 我的收藏
          </h2>
          <p className="text-amber-600 text-sm">
            珍藏每一杯心动的特调配方
          </p>
        </div>

        <RecipeGrid recipes={favorites} type="favorites" />
      </div>
    </div>
  );
}
