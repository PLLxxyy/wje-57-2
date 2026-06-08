import { ingredients } from '@/data/ingredients';
import { CardStyle, CoffeeRecipe } from '@/types';

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPickMultiple<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function generateRecipe(style: CardStyle): CoffeeRecipe {
  const base = randomPick(ingredients.bases);
  const flavorCount = Math.floor(Math.random() * 2) + 2;
  const flavors = randomPickMultiple(ingredients.flavors, flavorCount);
  const milk = randomPick(ingredients.milks);
  const topping = randomPick(ingredients.toppings);

  return {
    id: generateId(),
    name: '',
    base,
    flavors,
    milk,
    topping,
    description: '',
    createdAt: Date.now(),
    isFavorite: false,
    style,
  };
}
