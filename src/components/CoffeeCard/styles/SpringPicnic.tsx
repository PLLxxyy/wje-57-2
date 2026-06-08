import { CoffeeCardData } from '@/types';

interface Props {
  data: CoffeeCardData;
}

export default function SpringPicnic({ data }: Props) {
  const { recipe, shop } = data;
  const flavors = recipe.flavors.join(' · ');

  return (
    <div 
      className="w-full h-full p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFBF5 100%)',
        fontFamily: "'Noto Sans SC', sans-serif",
      }}
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A5D6A7' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-0 left-0 w-full h-3 opacity-60">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #FFCDD2 0px, #FFCDD2 10px, #C8E6C9 10px, #C8E6C9 20px, #FFF9C4 20px, #FFF9C4 30px)`
        }} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-3 opacity-60">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #B3E5FC 0px, #B3E5FC 10px, #F8BBD9 10px, #F8BBD9 20px, #DCEDC8 20px, #DCEDC8 30px)`
        }} />
      </div>

      <div className="absolute top-6 right-6 text-3xl opacity-30">🌸</div>
      <div className="absolute bottom-16 left-6 text-2xl opacity-25">🌿</div>
      <div className="absolute top-1/3 left-4 text-xl opacity-20">🍃</div>
      <div className="absolute top-1/2 right-4 text-xl opacity-25">🌼</div>

      <div className="relative z-10 pt-4 h-full flex flex-col">
        <div className="text-center mb-6">
          <div className="text-green-600/60 text-xs tracking-[0.2em] mb-2">🌱 SPRING SPECIAL 🌱</div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              fontFamily: "'Noto Sans SC', sans-serif",
              color: '#5D4037',
              letterSpacing: '0.05em',
            }}
          >
            {recipe.name}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="text-pink-300">✿</span>
            <span className="text-green-500/60 text-xs">春日特调咖啡</span>
            <span className="text-pink-300">✿</span>
          </div>
        </div>

        <div 
          className="rounded-2xl p-5 mb-4"
          style={{
            background: 'rgba(255,255,255,0.7)',
            border: '2px dashed #A5D6A7',
          }}
        >
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700/70">🌿 基底</span>
              <span className="text-brown-800 font-medium">{recipe.base}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700/70">🌿 风味</span>
              <span className="text-brown-800 font-medium">{flavors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700/70">🌿 奶类</span>
              <span className="text-brown-800 font-medium">{recipe.milk}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700/70">🌿 装饰</span>
              <span className="text-brown-800 font-medium">{recipe.topping}</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-green-600/70 text-xs mb-2 flex items-center gap-2">
            <span>✎</span>
            <span>风味笔记</span>
            <span>✎</span>
          </div>
          <p 
            className="text-brown-700 text-sm leading-relaxed"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {recipe.description}
          </p>
        </div>

        <div 
          className="mt-4 rounded-xl p-4"
          style={{
            background: 'rgba(255,240,245,0.6)',
            border: '1px solid #F8BBD9',
          }}
        >
          <div className="flex items-start gap-3">
            <div className="text-xl">📍</div>
            <div>
              <div className="text-brown-700 font-semibold text-sm">
                {shop.name}
              </div>
              <div className="text-green-600/70 text-xs">{shop.city}</div>
              <p className="text-brown-600/70 text-xs mt-1 leading-relaxed">
                {shop.atmosphere}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 text-pink-200 text-[10px] tracking-widest">
          No.{recipe.createdAt.toString().slice(-6)} 🌸
        </div>
      </div>
    </div>
  );
}
