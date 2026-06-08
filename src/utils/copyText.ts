import { CoffeeRecipe, CoffeeShop } from '@/types';

export function generateShareText(recipe: CoffeeRecipe, shop: CoffeeShop): string {
  const flavors = recipe.flavors.join('、');
  
  return `☕ ${recipe.name}

【配方】
基底：${recipe.base}
风味：${flavors}
奶类：${recipe.milk}
装饰：${recipe.topping}

【风味描述】
${recipe.description}

📍 ${shop.name} · ${shop.city}
${shop.atmosphere}

#虚构咖啡配方生成器 #咖啡特调 #创意咖啡`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (e) {
      document.body.removeChild(textarea);
      console.error('Failed to copy:', e);
      return false;
    }
  }
}
