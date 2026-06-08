export type CardStyle = 'vintage' | 'minimalist' | 'midnight' | 'spring';

export interface Group {
  id: string;
  name: string;
  type: 'favorites' | 'history';
  createdAt: number;
}

export interface CoffeeRecipe {
  id: string;
  name: string;
  base: string;
  flavors: string[];
  milk: string;
  topping: string;
  description: string;
  createdAt: number;
  isFavorite: boolean;
  style: CardStyle;
  groupId: string | null;
}

export interface CoffeeShop {
  name: string;
  city: string;
  atmosphere: string;
}

export interface CoffeeCardData {
  recipe: CoffeeRecipe;
  shop: CoffeeShop;
  style: CardStyle;
}

export interface IngredientsData {
  bases: string[];
  flavors: string[];
  milks: string[];
  toppings: string[];
}
