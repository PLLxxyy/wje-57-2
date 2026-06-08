import { useState, useRef, useEffect } from 'react';
import { FolderMove, Check, ChevronDown } from 'lucide-react';
import { Group } from '@/types';

interface Props {
  recipeId: string;
  currentGroupId: string | null;
  groups: Group[];
  type: 'favorites' | 'history';
  onMove: (recipeId: string, groupId: string | null, type: 'favorites' | 'history') => void;
}

export default function MoveToGroupMenu({ recipeId, currentGroupId, groups, type, onMove }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredGroups = groups.filter(g => g.type === type);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMove = (groupId: string | null) => {
    onMove(recipeId, groupId, type);
    setIsOpen(false);
  };

  const currentGroupName = currentGroupId 
    ? groups.find(g => g.id === currentGroupId)?.name || '未分组'
    : '未分组';

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2.5 py-1.5 bg-white/80 rounded-lg text-xs font-medium text-amber-700 hover:bg-white transition-colors"
        title="移动到分组"
      >
        <FolderMove className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">分组</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-amber-200 py-2 z-20 min-w-[160px] overflow-hidden"
        >
          <div className="px-3 py-1.5 text-xs font-medium text-amber-500 border-b border-amber-100">
            移动到：
          </div>
          <button
            onClick={() => handleMove(null)}
            className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-amber-50 transition-colors ${
              currentGroupId === null ? 'text-amber-600 bg-amber-50' : 'text-gray-700'
            }`}
          >
            <span>未分组</span>
            {currentGroupId === null && <Check className="w-3.5 h-3.5" />}
          </button>
          {filteredGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => handleMove(group.id)}
              className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-amber-50 transition-colors ${
                currentGroupId === group.id ? 'text-amber-600 bg-amber-50' : 'text-gray-700'
              }`}
            >
              <span className="truncate">{group.name}</span>
              {currentGroupId === group.id && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
            </button>
          ))}
          <div className="px-3 py-1.5 text-xs text-gray-400 border-t border-amber-100">
            当前：{currentGroupName}
          </div>
        </div>
      )}
    </div>
  );
}
