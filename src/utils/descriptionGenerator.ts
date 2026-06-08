import { descriptionTemplates } from '@/data/templates';

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateDescription(
  base: string,
  flavors: string[],
  topping: string,
  milk: string
): string {
  const opening = randomPick(descriptionTemplates.openings);
  const texture = randomPick(descriptionTemplates.textures);
  
  let flavorText = randomPick(descriptionTemplates.flavors);
  flavorText = flavorText
    .replace('{flavor1}', flavors[0] || '咖啡')
    .replace('{flavor2}', flavors[1] || flavors[0] || '奶香');
  
  let middle = randomPick(descriptionTemplates.middles);
  middle = middle.replace('{base}', base);
  
  let ending = randomPick(descriptionTemplates.endings);
  ending = ending.replace('{topping}', topping);
  
  const milkHint = milk && milk !== '全脂牛奶' 
    ? `搭配${milk}带来的独特香气，` 
    : '';
  
  return `${opening}${texture}${flavorText}${milkHint}${middle}${ending}`;
}
