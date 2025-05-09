
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabBarProps {
  tabs: Array<{ id: string; title: string; language?: string; }>;
  activeTabId: string | null;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const TabBar = ({ tabs, activeTabId, onTabSelect, onTabClose }: TabBarProps) => {
  if (tabs.length === 0) {
    return <div className="h-9 bg-vscode-bg border-b border-gray-800 flex items-center px-3 text-xs text-gray-500">VS Code Cloud Development Environment</div>;
  }

  // Helper function to get file icon based on language
  const getFileIcon = (language?: string) => {
    // Map of languages to their icons
    const iconMap: Record<string, string> = {
      'javascript': 'js',
      'typescript': 'ts',
      'jsx': 'jsx',
      'tsx': 'tsx',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'markdown': 'md',
      'python': 'py',
      'go': 'go',
      'rust': 'rs',
      'java': 'java',
      'c': 'c',
      'cpp': 'cpp',
    };
    
    const icon = language ? iconMap[language] || language.substring(0, 3) : 'txt';
    return <span className="text-xs mr-1.5 opacity-70">{icon}</span>;
  };

  return (
    <div className="flex h-9 bg-vscode-bg border-b border-gray-800 overflow-x-auto scrollbar-thin">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            className={cn(
              "flex items-center px-3 border-r border-gray-800 min-w-[120px] max-w-[200px] cursor-pointer transition-colors",
              isActive ? "bg-vscode-active-tab" : "bg-vscode-inactive-tab hover:bg-gray-700"
            )}
            onClick={() => onTabSelect(tab.id)}
          >
            {getFileIcon(tab.language)}
            <span className="truncate text-sm flex-1">{tab.title}</span>
            <button
              className="ml-2 p-1 rounded-sm opacity-60 hover:opacity-100 hover:bg-gray-700 focus:outline-none"
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
