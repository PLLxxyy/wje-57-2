import { Heart, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CoffeeRecipe } from '@/types';
import { useCoffeeStore } from '@/store/useCoffeeStore';

interface Props {
  recipes: CoffeeRecipe[];
  type: 'favorites' | 'history';
}

export default function RecipeGrid({ recipes, type }: Props) {
  const navigate = useNavigate();
  const { removeFavorite, toggleFavorite, clearHistory, loadRecipeFromHistory } = useCoffeeStore();

  const styleColors = {
    vintage: 'from-amber-100 to-orange-100 border-amber-300',
    minimalist: 'from-gray-50 to-white border-gray-200',
    midnight: 'from-slate-800 to-slate-900 border-slate-600',
    spring: 'from-green-50 to-pink-50 border-green-200',
  };

  const styleTextColors = {
    vintage: 'text-amber-800',
    minimalist: 'text-gray-800',
    midnight: 'text-amber-100',
    spring: 'text-green-800',
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4 opacity-30">
          {type === 'favorites' ? '💝' : '📜'}
        </div>
        <h3 className="text-xl font-semibold text-amber-700 mb-2">
          {type === 'favorites' ? '还没有收藏任何配方' : '还没有生成过配方'}
        </h3>
        <p className="text-amber-500 text-sm mb-6">
          {type === 'favorites' 
            ? '去生成器页面发现你的专属特调吧！' 
            : '点击下方按钮开始生成第一杯特调咖啡'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
        >
          去生成一杯
        </button>
      </div>
    );
  }

  return (
    <div>
      {type === 'history' && recipes.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={clearHistory}
            className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            清空历史
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className={`relative rounded-2xl overflow-hidden border-2 bg-gradient-to-br ${styleColors[recipe.style]} transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group`}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className={`font-bold text-lg ${styleTextColors[recipe.style]}`}>
                  {recipe.name}
                </h3>
                <button
                  onClick={() => type === 'favorites' 
                    ? removeFavorite(recipe.id) 
                    : toggleFavorite(recipe.id)
                  }
                  className={`p-2 rounded-full transition-colors ${
                    recipe.isFavorite 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-400 hover:text-red-400 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              <div className={`space-y-1 text-xs mb-3 ${styleTextColors[recipe.style]} opacity-70`}>
                <div>基底：{recipe.base}</div>
                <div>风味：{recipe.flavors.join('、')}</div>
                <div>奶类：{recipe.milk}</div>
              </div>

              <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${styleTextColors[recipe.style]} opacity-80`}>
                {recipe.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`text-[10px] ${styleTextColors[recipe.style]} opacity-50`}>
                  {formatDate(recipe.createdAt)}
                </span>
                <button
                  onClick={() => {
                    loadRecipeFromHistory(recipe);
                    navigate('/');
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-medium text-amber-700 hover:bg-white transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  查看
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
