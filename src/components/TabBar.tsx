
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabBarProps {
  tabs: Array<{ id: string; title: string; }>;
  activeTabId: string | null;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const TabBar = ({ tabs, activeTabId, onTabSelect, onTabClose }: TabBarProps) => {
  if (tabs.length === 0) {
    return <div className="h-9 bg-vscode-bg border-b border-gray-800"></div>;
  }

  return (
    <div className="flex h-9 bg-vscode-bg border-b border-gray-800 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            className={cn(
              "flex items-center px-4 border-r border-gray-800 min-w-[120px] max-w-[200px] cursor-pointer",
              isActive ? "bg-vscode-active-tab" : "bg-vscode-inactive-tab"
            )}
            onClick={() => onTabSelect(tab.id)}
          >
            <span className="truncate text-sm flex-1">{tab.title}</span>
            <button
              className="ml-2 p-1 rounded-sm hover:bg-gray-700 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;
