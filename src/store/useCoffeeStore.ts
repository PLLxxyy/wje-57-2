import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CardStyle, CoffeeCardData, CoffeeRecipe, Group } from '@/types';
import { generateRecipe } from '@/utils/recipeGenerator';
import { generateCoffeeName } from '@/utils/nameGenerator';
import { generateDescription } from '@/utils/descriptionGenerator';
import { generateShop } from '@/utils/shopGenerator';

interface CoffeeState {
  currentCard: CoffeeCardData | null;
  favorites: CoffeeRecipe[];
  history: CoffeeRecipe[];
  groups: Group[];
  activeGroupIds: {
    favorites: string | null;
    history: string | null;
  };
  currentStyle: CardStyle;
  isGenerating: boolean;
  
  generateNewRecipe: () => void;
  toggleFavorite: (recipeId: string) => void;
  setCurrentStyle: (style: CardStyle) => void;
  clearHistory: () => void;
  removeFavorite: (recipeId: string) => void;
  loadRecipeFromHistory: (recipe: CoffeeRecipe) => void;
  createGroup: (name: string, type: 'favorites' | 'history') => void;
  updateGroup: (groupId: string, name: string) => void;
  deleteGroup: (groupId: string) => void;
  setActiveGroup: (groupId: string | null, type: 'favorites' | 'history') => void;
  moveRecipeToGroup: (recipeId: string, groupId: string | null, type: 'favorites' | 'history') => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useCoffeeStore = create<CoffeeState>()(
  persist(
    (set, get) => ({
      currentCard: null,
      favorites: [],
      history: [],
      groups: [],
      activeGroupIds: {
        favorites: null,
        history: null,
      },
      currentStyle: 'vintage',
      isGenerating: false,

      generateNewRecipe: () => {
        set({ isGenerating: true });
        
        setTimeout(() => {
          const style = get().currentStyle;
          const baseRecipe = generateRecipe(style);
          const name = generateCoffeeName(baseRecipe.flavors, baseRecipe.base);
          const description = generateDescription(
            baseRecipe.base,
            baseRecipe.flavors,
            baseRecipe.topping,
            baseRecipe.milk
          );
          const shop = generateShop();

          const recipe: CoffeeRecipe = {
            ...baseRecipe,
            name,
            description,
            favoriteGroupId: null,
            historyGroupId: null,
          };

          const cardData: CoffeeCardData = {
            recipe,
            shop,
            style,
          };

          set((state) => ({
            currentCard: cardData,
            history: [recipe, ...state.history].slice(0, 100),
            isGenerating: false,
          }));
        }, 600);
      },

      toggleFavorite: (recipeId: string) => {
        set((state) => {
          const isCurrentlyFavorite = state.favorites.some(f => f.id === recipeId);
          let newFavorites: CoffeeRecipe[];
          
          if (isCurrentlyFavorite) {
            newFavorites = state.favorites.filter(f => f.id !== recipeId);
          } else {
            const recipeToAdd = state.currentCard?.recipe 
              || state.history.find(h => h.id === recipeId);
            if (recipeToAdd) {
              const existingRecipeInHistory = state.history.find(h => h.id === recipeId);
              const existingRecipeInFavorites = state.favorites.find(f => f.id === recipeId);
              newFavorites = [{ 
                ...recipeToAdd, 
                isFavorite: true,
                favoriteGroupId: existingRecipeInFavorites?.favoriteGroupId || null,
                historyGroupId: existingRecipeInHistory?.historyGroupId || recipeToAdd.historyGroupId || null,
              }, ...state.favorites];
            } else {
              newFavorites = state.favorites;
            }
          }

          const updatedHistory = state.history.map(h => 
            h.id === recipeId ? { ...h, isFavorite: !isCurrentlyFavorite } : h
          );

          let updatedCurrentCard = state.currentCard;
          if (state.currentCard?.recipe.id === recipeId) {
            updatedCurrentCard = {
              ...state.currentCard,
              recipe: {
                ...state.currentCard.recipe,
                isFavorite: !isCurrentlyFavorite,
              },
            };
          }

          return {
            favorites: newFavorites,
            history: updatedHistory,
            currentCard: updatedCurrentCard,
          };
        });
      },

      setCurrentStyle: (style: CardStyle) => {
        set((state) => ({
          currentStyle: style,
          currentCard: state.currentCard
            ? { ...state.currentCard, style }
            : null,
        }));
      },

      clearHistory: () => {
        set({ history: [] });
      },

      removeFavorite: (recipeId: string) => {
        set((state) => ({
          favorites: state.favorites.filter(f => f.id !== recipeId),
          history: state.history.map(h => 
            h.id === recipeId ? { ...h, isFavorite: false } : h
          ),
        }));
      },

      loadRecipeFromHistory: (recipe: CoffeeRecipe) => {
        const shop = generateShop();
        set((state) => ({
          currentCard: {
            recipe,
            shop,
            style: recipe.style,
          },
          currentStyle: recipe.style,
        }));
      },

      createGroup: (name: string, type: 'favorites' | 'history') => {
        const newGroup: Group = {
          id: generateId(),
          name,
          type,
          createdAt: Date.now(),
        };
        set((state) => ({
          groups: [...state.groups, newGroup],
        }));
      },

      updateGroup: (groupId: string, name: string) => {
        set((state) => ({
          groups: state.groups.map(g => 
            g.id === groupId ? { ...g, name } : g
          ),
        }));
      },

      deleteGroup: (groupId: string) => {
        set((state) => {
          const group = state.groups.find(g => g.id === groupId);
          if (!group) return state;

          let updatedFavorites = state.favorites;
          let updatedHistory = state.history;

          if (group.type === 'favorites') {
            updatedFavorites = state.favorites.map(r => 
              r.favoriteGroupId === groupId ? { ...r, favoriteGroupId: null } : r
            );
          } else {
            updatedHistory = state.history.map(r => 
              r.historyGroupId === groupId ? { ...r, historyGroupId: null } : r
            );
          }

          const newActiveGroupIds = { ...state.activeGroupIds };
          if (newActiveGroupIds[group.type] === groupId) {
            newActiveGroupIds[group.type] = null;
          }

          return {
            groups: state.groups.filter(g => g.id !== groupId),
            favorites: updatedFavorites,
            history: updatedHistory,
            activeGroupIds: newActiveGroupIds,
          };
        });
      },

      setActiveGroup: (groupId: string | null, type: 'favorites' | 'history') => {
        set((state) => ({
          activeGroupIds: {
            ...state.activeGroupIds,
            [type]: groupId,
          },
        }));
      },

      moveRecipeToGroup: (recipeId: string, groupId: string | null, type: 'favorites' | 'history') => {
        set((state) => {
          if (type === 'favorites') {
            const updateFavoriteRecipe = (r: CoffeeRecipe) => 
              r.id === recipeId ? { ...r, favoriteGroupId: groupId } : r;
            return {
              favorites: state.favorites.map(updateFavoriteRecipe),
            };
          } else {
            const updateHistoryRecipe = (r: CoffeeRecipe) => 
              r.id === recipeId ? { ...r, historyGroupId: groupId } : r;
            return {
              history: state.history.map(updateHistoryRecipe),
            };
          }
        });
      },
    }),
    {
      name: 'coffee-generator-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        history: state.history,
        groups: state.groups,
        activeGroupIds: state.activeGroupIds,
        currentStyle: state.currentStyle,
      }),
    }
  )
);
