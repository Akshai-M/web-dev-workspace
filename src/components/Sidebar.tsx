
import { FileText, FolderOpen, Search, GitBranch, Bug } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isExpanded: boolean;
}

const Sidebar = ({ activeView, onViewChange, isExpanded }: SidebarProps) => {
  const sidebarItems = [
    { id: 'explorer', icon: <FileText size={24} />, title: 'Explorer' },
    { id: 'search', icon: <Search size={24} />, title: 'Search' },
    { id: 'git', icon: <GitBranch size={24} />, title: 'Source Control' },
    { id: 'debug', icon: <Bug size={24} />, title: 'Run and Debug' },
  ];
  
  return (
    <div className="h-full bg-vscode-sidebar border-r border-gray-800 flex">
      {/* Activity Bar */}
      <div className="w-12 h-full border-r border-gray-800 flex flex-col items-center py-2 space-y-4">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "p-2 rounded hover:bg-gray-700 focus:outline-none relative",
              activeView === item.id && "text-blue-400"
            )}
            onClick={() => onViewChange(item.id)}
            title={item.title}
          >
            {item.icon}
            {activeView === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-400"></div>
            )}
          </button>
        ))}
        
        <div className="flex-1"></div>
        
        <button className="p-2 rounded hover:bg-gray-700 focus:outline-none">
          <FolderOpen size={24} />
        </button>
      </div>
      
      {/* Sidebar Content (only shown when expanded) */}
      {isExpanded && (
        <div className="w-60 h-full bg-vscode-sidebar">
          {activeView === 'explorer' && (
            <div className="p-2 text-sm font-medium">EXPLORER</div>
          )}
          {activeView === 'search' && (
            <div className="p-2 text-sm font-medium">SEARCH</div>
          )}
          {activeView === 'git' && (
            <div className="p-2 text-sm font-medium">SOURCE CONTROL</div>
          )}
          {activeView === 'debug' && (
            <div className="p-2 text-sm font-medium">RUN AND DEBUG</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
