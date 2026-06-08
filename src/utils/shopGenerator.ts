import { CoffeeShop } from '@/types';
import { shopNames, cities, atmospheres } from '@/data/templates';

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateShop(): CoffeeShop {
  return {
    name: randomPick(shopNames),
    city: randomPick(cities),
    atmosphere: randomPick(atmospheres),
  };
}
