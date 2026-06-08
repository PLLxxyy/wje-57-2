import { Heart, Trash2, Eye, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CoffeeRecipe, Group } from '@/types';
import { useCoffeeStore } from '@/store/useCoffeeStore';
import MoveToGroupMenu from './MoveToGroupMenu';

interface Props {
  recipes: CoffeeRecipe[];
  type: 'favorites' | 'history';
  groups: Group[];
  activeGroupId: string | null;
}

export default function RecipeGrid({ recipes, type, groups, activeGroupId }: Props) {
  const navigate = useNavigate();
  const { removeFavorite, toggleFavorite, clearHistory, loadRecipeFromHistory, moveRecipeToGroup } = useCoffeeStore();

  const getGroupId = (recipe: CoffeeRecipe) => {
    return type === 'favorites' ? recipe.favoriteGroupId : recipe.historyGroupId;
  };

  const filteredRecipes = recipes.filter(recipe => {
    if (activeGroupId === null) return true;
    const recipeGroupId = getGroupId(recipe);
    if (activeGroupId === 'ungrouped') return recipeGroupId === null;
    return recipeGroupId === activeGroupId;
  });

  const getGroupName = (recipe: CoffeeRecipe) => {
    const groupId = getGroupId(recipe);
    if (!groupId) return null;
    return groups.find(g => g.id === groupId)?.name;
  };

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

  if (filteredRecipes.length === 0) {
    const emptyMessage = activeGroupId === 'ungrouped' 
      ? '该分组暂无配方'
      : activeGroupId 
        ? '该分组暂无配方'
        : (type === 'favorites' ? '还没有收藏任何配方' : '还没有生成过配方');
    
    const emptySubMessage = activeGroupId 
      ? '可以将其他配方移动到此分组'
      : (type === 'favorites' 
        ? '去生成器页面发现你的专属特调吧！' 
        : '点击下方按钮开始生成第一杯特调咖啡');

    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4 opacity-30">
          {type === 'favorites' ? '💝' : '📜'}
        </div>
        <h3 className="text-xl font-semibold text-amber-700 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-amber-500 text-sm mb-6">
          {emptySubMessage}
        </p>
        {!activeGroupId && (
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
          >
            去生成一杯
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {type === 'history' && (
        <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-amber-600">
          共 {filteredRecipes.length} 个配方
        </div>
        <button
          onClick={clearHistory}
          className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          清空历史
        </button>
      </div>
      )}

      {type === 'favorites' && (
        <div className="text-sm text-amber-600 mb-4">
          共 {filteredRecipes.length} 个配方
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => {
          const groupName = getGroupName(recipe);
          const currentGroupId = getGroupId(recipe);
          return (
          <div
            key={recipe.id}
            className={`relative rounded-2xl overflow-hidden border-2 bg-gradient-to-br ${styleColors[recipe.style]} transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group`}
          >
            {groupName && (
              <div className={`absolute top-0 left-0 right-0 px-4 py-1.5 flex items-center gap-1 ${
                recipe.style === 'midnight' ? 'bg-slate-700/80' : 'bg-amber-100/80'
              }`}>
                <Tag className={`w-3 h-3 ${
                  recipe.style === 'midnight' ? 'text-amber-300' : 'text-amber-600'
                }`} />
                <span className={`text-[10px] font-medium ${
                  recipe.style === 'midnight' ? 'text-amber-200' : 'text-amber-700'
                }`}>
                  {groupName}
                </span>
              </div>
            )}
            <div className={`p-5 ${groupName ? 'pt-9' : ''}`}>
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
                <div className="flex items-center gap-1">
                  <MoveToGroupMenu
                    recipeId={recipe.id}
                    currentGroupId={currentGroupId}
                    groups={groups}
                    type={type}
                    onMove={moveRecipeToGroup}
                  />
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
          </div>
        );})}
      </div>
    </div>
  );
}
