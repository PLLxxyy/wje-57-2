import { CoffeeCardData } from '@/types';

interface Props {
  data: CoffeeCardData;
}

export default function MidnightCafe({ data }: Props) {
  const { recipe, shop } = data;
  const flavors = recipe.flavors.join(' · ');

  return (
    <div 
      className="w-full h-full p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 50%, #0F0F1A 100%)',
        fontFamily: "'Noto Sans SC', sans-serif",
      }}
    >
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,200,100,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 20% 30%, rgba(255,100,100,0.1) 0%, transparent 30%)`,
        }}
      />

      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="text-center mb-6">
          <div 
            className="text-xs tracking-[0.3em] mb-3"
            style={{ 
              color: '#FFE082',
              textShadow: '0 0 10px rgba(255,224,130,0.5)',
            }}
          >
            ✦ MIDNIGHT SPECIAL ✦
          </div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              fontFamily: "'Noto Sans SC', sans-serif",
              color: '#FFF8E1',
              textShadow: '0 0 20px rgba(255,200,100,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            {recipe.name}
          </h1>
          <div 
            className="w-20 h-[1px] mx-auto"
            style={{ 
              background: 'linear-gradient(90deg, transparent, #FFAB40, transparent)',
              boxShadow: '0 0 10px rgba(255,171,64,0.5)',
            }}
          />
        </div>

        <div className="flex-1 space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-amber-200/70 text-xs tracking-wider">◈ 基底</span>
              <span 
                className="text-amber-50 text-sm"
                style={{ textShadow: '0 0 8px rgba(255,200,100,0.2)' }}
              >
                {recipe.base}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-200/70 text-xs tracking-wider">◈ 风味</span>
              <span 
                className="text-amber-50 text-sm"
                style={{ textShadow: '0 0 8px rgba(255,200,100,0.2)' }}
              >
                {flavors}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-200/70 text-xs tracking-wider">◈ 奶类</span>
              <span 
                className="text-amber-50 text-sm"
                style={{ textShadow: '0 0 8px rgba(255,200,100,0.2)' }}
              >
                {recipe.milk}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-200/70 text-xs tracking-wider">◈ 装饰</span>
              <span 
                className="text-amber-50 text-sm"
                style={{ textShadow: '0 0 8px rgba(255,200,100,0.2)' }}
              >
                {recipe.topping}
              </span>
            </div>
          </div>

          <div className="pt-4">
            <div className="text-amber-200/60 text-[10px] tracking-widest mb-2">
              ✧ 风味手记 ✧
            </div>
            <p 
              className="text-amber-100/80 text-sm leading-relaxed"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {recipe.description}
            </p>
          </div>
        </div>

        <div className="pt-4 mt-auto border-t border-amber-700/20">
          <div className="flex items-start gap-3">
            <div className="text-amber-300/60 text-lg">🌙</div>
            <div>
              <div 
                className="text-amber-100 font-medium text-sm"
                style={{ textShadow: '0 0 10px rgba(255,200,100,0.2)' }}
              >
                {shop.name}
              </div>
              <div className="text-amber-200/50 text-xs">{shop.city}</div>
              <p className="text-amber-100/50 text-xs mt-1 leading-relaxed">
                {shop.atmosphere}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 text-amber-700/40 text-[10px] tracking-widest">
          No.{recipe.createdAt.toString().slice(-6)}
        </div>
      </div>
    </div>
  );
}
