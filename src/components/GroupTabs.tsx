import { useState } from 'react';
import { FolderPlus, Pencil, Trash2, Check, X, FolderOpen } from 'lucide-react';
import { Group } from '@/types';
import { useCoffeeStore } from '@/store/useCoffeeStore';

interface Props {
  groups: Group[];
  activeGroupId: string | null;
  type: 'favorites' | 'history';
  onGroupChange: (groupId: string | null) => void;
}

export default function GroupTabs({ groups, activeGroupId, type, onGroupChange }: Props) {
  const { createGroup, updateGroup, deleteGroup } = useCoffeeStore();
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      createGroup(newGroupName.trim(), type);
      setNewGroupName('');
      setShowCreateInput(false);
    }
  };

  const handleStartEdit = (group: Group) => {
    setEditingGroupId(group.id);
    setEditingName(group.name);
  };

  const handleSaveEdit = () => {
    if (editingGroupId && editingName.trim()) {
      updateGroup(editingGroupId, editingName.trim());
    }
    setEditingGroupId(null);
    setEditingName('');
  };

  const handleCancelEdit = () => {
    setEditingGroupId(null);
    setEditingName('');
  };

  const handleDeleteGroup = (groupId: string) => {
    if (confirm('确定要删除这个分组吗？分组内的配方将移至"未分组"。')) {
      deleteGroup(groupId);
    }
  };

  const filteredGroups = groups.filter(g => g.type === type);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
        <button
          onClick={() => onGroupChange(null)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeGroupId === null
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white/80 text-amber-700 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          全部
        </button>
        
        <button
          onClick={() => onGroupChange('ungrouped')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeGroupId === 'ungrouped'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white/80 text-amber-700 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          未分组
        </button>

        {filteredGroups.map((group) => (
          <div key={group.id} className="flex items-center gap-1">
            {editingGroupId === group.id ? (
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-full border border-amber-300">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-24 px-2 py-1 text-sm bg-transparent border-none outline-none text-amber-800"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <button
                  onClick={handleSaveEdit}
                  className="p-1 text-green-600 hover:bg-green-100 rounded-full"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 group">
                <button
                  onClick={() => onGroupChange(group.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeGroupId === group.id
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-white/80 text-amber-700 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  {group.name}
                </button>
                {activeGroupId === group.id && (
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => handleStartEdit(group)}
                      className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-full transition-colors"
                      title="重命名"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="删除分组"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {showCreateInput ? (
          <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-full border border-amber-300">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="分组名称"
              className="w-24 px-2 py-1 text-sm bg-transparent border-none outline-none text-amber-800 placeholder-amber-400"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateGroup();
                if (e.key === 'Escape') {
                  setShowCreateInput(false);
                  setNewGroupName('');
                }
              }}
            />
            <button
              onClick={handleCreateGroup}
              className="p-1 text-green-600 hover:bg-green-100 rounded-full"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setShowCreateInput(false);
                setNewGroupName('');
              }}
              className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCreateInput(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white/60 text-amber-600 hover:bg-amber-100 border border-dashed border-amber-300 transition-all whitespace-nowrap"
          >
            <FolderPlus className="w-4 h-4" />
            新建分组
          </button>
        )}
      </div>
    </div>
  );
}
