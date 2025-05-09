
import { FileText, FolderOpen, Search, GitBranch, Bug, Code, Settings, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isExpanded: boolean;
  onOpenInCodespace?: () => void;
}

const Sidebar = ({ activeView, onViewChange, isExpanded, onOpenInCodespace }: SidebarProps) => {
  const sidebarItems = [
    { id: 'explorer', icon: <FileText size={24} />, title: 'Explorer' },
    { id: 'search', icon: <Search size={24} />, title: 'Search' },
    { id: 'git', icon: <GitBranch size={24} />, title: 'Source Control' },
    { id: 'debug', icon: <Bug size={24} />, title: 'Run and Debug' },
    { id: 'codespace', icon: <Code size={24} />, title: 'Development Environments' },
  ];
  
  const handleOpenInVSCode = (platform: string) => {
    if (onOpenInCodespace) {
      toast({
        title: `Launching in ${platform}`,
        description: "Opening your project in a full cloud development environment...",
      });
      onOpenInCodespace();
    }
  };
  
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
        
        <button className="p-2 rounded hover:bg-gray-700 focus:outline-none" title="Open Folder">
          <FolderOpen size={24} />
        </button>
        
        <button className="p-2 rounded hover:bg-gray-700 focus:outline-none" title="Settings">
          <Settings size={24} />
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
          {activeView === 'codespace' && (
            <div className="flex flex-col p-2">
              <div className="text-sm font-medium mb-4">DEVELOPMENT ENVIRONMENTS</div>
              
              <Button
                className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleOpenInVSCode("GitHub Codespaces")}
                variant="secondary"
              >
                <Code className="mr-2" size={18} />
                Launch Full VS Code
                <ExternalLink className="ml-2" size={14} />
              </Button>
              
              <div className="bg-vscode-bg rounded p-3 mb-2 hover:bg-gray-700 cursor-pointer"
                   onClick={() => handleOpenInVSCode("GitHub Codespaces")}>
                <h3 className="text-sm font-medium mb-1">GitHub Codespaces</h3>
                <p className="text-xs text-gray-400">Full-featured VS Code with terminal and extensions</p>
              </div>
              <div className="bg-vscode-bg rounded p-3 hover:bg-gray-700 cursor-pointer"
                   onClick={() => handleOpenInVSCode("Gitpod")}>
                <h3 className="text-sm font-medium mb-1">Gitpod</h3>
                <p className="text-xs text-gray-400">Cloud workspace with full terminal access</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
