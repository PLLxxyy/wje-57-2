import { nameTemplates } from '@/data/templates';

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCoffeeName(flavors: string[], base: string): string {
  const patterns = [
    () => `${randomPick(nameTemplates.adjectives)}${randomPick(nameTemplates.nouns)}${randomPick(nameTemplates.coffeeTerms)}`,
    () => `${randomPick(nameTemplates.adjectives)}${flavors[0]}${randomPick(nameTemplates.coffeeTerms)}`,
    () => `${randomPick(nameTemplates.nouns)}${randomPick(nameTemplates.coffeeTerms)}`,
    () => `${flavors[0]}${flavors[1] || ''}特调`,
    () => `${randomPick(nameTemplates.adjectives)}${base}特调`,
  ];

  const pattern = randomPick(patterns);
  return pattern();
}
