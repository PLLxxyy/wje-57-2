import { useState } from 'react';
import { Heart, Download, Copy, RefreshCw } from 'lucide-react';
import { useCoffeeStore } from '@/store/useCoffeeStore';
import { exportCardAsImage } from '@/utils/exportCard';
import { generateShareText, copyToClipboard } from '@/utils/copyText';

export default function ActionButtons() {
  const { currentCard, generateNewRecipe, toggleFavorite, isGenerating } = useCoffeeStore();
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleCopy = async () => {
    if (!currentCard) return;
    const text = generateShareText(currentCard.recipe, currentCard.shop);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!currentCard) return;
    setExporting(true);
    try {
      const fileName = `${currentCard.recipe.name}.png`;
      await exportCardAsImage('coffee-card', fileName);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setTimeout(() => setExporting(false), 1000);
    }
  };

  const isFavorite = currentCard?.recipe.isFavorite ?? false;

  return (
    <div className="w-full space-y-4">
      <button
        onClick={generateNewRecipe}
        disabled={isGenerating}
        className={`w-full py-4 px-8 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]`}
      >
        <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
        <span>{isGenerating ? '调配中...' : '生成一杯特调'}</span>
      </button>

      {currentCard && (
        <div className="flex justify-center gap-3">
          <button
            onClick={() => toggleFavorite(currentCard.recipe.id)}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              isFavorite
                ? 'bg-red-50 text-red-500 border-2 border-red-200 hover:bg-red-100'
                : 'bg-white text-amber-700 border-2 border-amber-200 hover:bg-amber-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
            <span>{isFavorite ? '已收藏' : '收藏'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={exporting}
            className="flex-1 py-3 px-6 bg-white text-amber-700 border-2 border-amber-200 rounded-xl font-medium hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            <span>{exporting ? '导出中...' : '下载'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex-1 py-3 px-6 bg-white text-amber-700 border-2 border-amber-200 rounded-xl font-medium hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Copy className="w-5 h-5" />
            <span>{copied ? '已复制' : '复制'}</span>
          </button>
        </div>
      )}

      {copied && (
        <div className="text-center text-green-600 text-sm animate-bounce">
          ✓ 文案已复制到剪贴板，快去分享吧！
        </div>
      )}
    </div>
  );
}
