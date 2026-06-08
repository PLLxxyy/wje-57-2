import { CoffeeCardData } from '@/types';

interface Props {
  data: CoffeeCardData;
}

export default function VintageMenu({ data }: Props) {
  const { recipe, shop } = data;
  const flavors = recipe.flavors.join(' · ');

  return (
    <div 
      className="w-full h-full p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5F0E1 0%, #E8E0CC 100%)',
        fontFamily: "'Noto Serif SC', serif",
      }}
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-4 left-4 w-16 h-16 opacity-30">
        <div className="w-full h-full rounded-full border-2 border-amber-800 flex items-center justify-center">
          <div className="text-amber-900 text-xs text-center leading-tight">
            <div>特调</div>
            <div className="text-[10px]">2024</div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 opacity-20 transform rotate-12">
        <div className="w-20 h-20 rounded-full border-4 border-amber-700 flex items-center justify-center">
          <span className="text-amber-800 font-bold text-sm">SPECIA</span>
        </div>
      </div>

      <div className="relative z-10 pt-8">
        <div className="text-center mb-6">
          <div className="text-amber-700 text-xs tracking-[0.3em] mb-2">— HOUSE SPECIAL —</div>
          <h1 
            className="text-3xl font-bold text-amber-900 mb-2"
            style={{ fontFamily: "'Noto Serif SC', serif", letterSpacing: '0.1em' }}
          >
            {recipe.name}
          </h1>
          <div className="flex items-center justify-center gap-2 text-amber-700 text-xs">
            <span>◆</span>
            <span>创意特调咖啡</span>
            <span>◆</span>
          </div>
        </div>

        <div 
          className="border-t border-b border-amber-800/30 py-4 mb-4"
          style={{ borderStyle: 'dashed' }}
        >
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-amber-800">【基底】</span>
              <span className="text-amber-950">{recipe.base}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-800">【风味】</span>
              <span className="text-amber-950">{flavors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-800">【奶类】</span>
              <span className="text-amber-950">{recipe.milk}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-800">【装饰】</span>
              <span className="text-amber-950">{recipe.topping}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-amber-700 text-xs mb-2 tracking-wider">— 风味笔记 —</div>
          <p className="text-amber-900 text-sm leading-relaxed italic">
            {recipe.description}
          </p>
        </div>

        <div className="border-t border-amber-800/20 pt-4">
          <div className="flex items-start gap-3">
            <div className="text-amber-700 text-lg">📍</div>
            <div>
              <div className="text-amber-900 font-semibold text-sm">
                {shop.name}
              </div>
              <div className="text-amber-700 text-xs">{shop.city}</div>
              <p className="text-amber-800/70 text-xs mt-1 leading-relaxed">
                {shop.atmosphere}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-amber-600 text-[10px] opacity-50">
          No.{recipe.createdAt.toString().slice(-6)}
        </div>
      </div>
    </div>
  );
}
