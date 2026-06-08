import { CoffeeCardData } from '@/types';

interface Props {
  data: CoffeeCardData;
}

export default function Minimalist({ data }: Props) {
  const { recipe, shop } = data;
  const flavors = recipe.flavors.join(' / ');

  return (
    <div 
      className="w-full h-full p-8 relative"
      style={{
        background: '#FFFFFF',
        fontFamily: "'Noto Sans SC', sans-serif",
      }}
    >
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="text-center mb-8">
          <div className="text-gray-400 text-[10px] tracking-[0.4em] mb-3">SIGNATURE BLEND</div>
          <h1 
            className="text-2xl font-light text-gray-800 tracking-wide mb-2"
            style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            {recipe.name}
          </h1>
          <div 
            className="w-12 h-[1px] mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-[80px_1fr] gap-4 items-baseline">
              <span className="text-gray-400 text-xs tracking-wider">BASE</span>
              <span className="text-gray-700 text-sm">{recipe.base}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-4 items-baseline">
              <span className="text-gray-400 text-xs tracking-wider">FLAVOR</span>
              <span className="text-gray-700 text-sm">{flavors}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-4 items-baseline">
              <span className="text-gray-400 text-xs tracking-wider">MILK</span>
              <span className="text-gray-700 text-sm">{recipe.milk}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-4 items-baseline">
              <span className="text-gray-400 text-xs tracking-wider">TOPPING</span>
              <span className="text-gray-700 text-sm">{recipe.topping}</span>
            </div>
          </div>

          <div 
            className="pt-6 border-t border-gray-100"
            style={{ borderTopStyle: 'solid', borderTopWidth: '1px' }}
          >
            <div className="text-gray-400 text-[10px] tracking-widest mb-3">TASTE NOTES</div>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              {recipe.description}
            </p>
          </div>
        </div>

        <div className="pt-6 mt-auto border-t border-gray-50">
          <div className="flex items-start gap-3">
            <div className="text-gray-300 text-lg">☕</div>
            <div className="flex-1">
              <div className="text-gray-700 text-sm font-light">
                {shop.name}
              </div>
              <div className="text-gray-400 text-xs mt-0.5">{shop.city}</div>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed font-light">
                {shop.atmosphere}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 text-gray-200 text-[10px] tracking-widest">
          #{recipe.createdAt.toString().slice(-6)}
        </div>
      </div>
    </div>
  );
}
