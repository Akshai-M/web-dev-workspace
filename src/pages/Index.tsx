import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FileExplorer from '@/components/FileExplorer';
import CodeEditor from '@/components/CodeEditor';
import Terminal from '@/components/Terminal';
import TabBar from '@/components/TabBar';
import sampleFiles, { FileItem } from '@/data/sampleFiles';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink } from 'lucide-react';

const Index = () => {
  const [sidebarView, setSidebarView] = useState('explorer');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [openTabs, setOpenTabs] = useState<FileItem[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  // Handle file selection
  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    
    // If file is not already in open tabs, add it
    if (!openTabs.some(tab => tab.id === file.id)) {
      setOpenTabs(prev => [...prev, file]);
    }
    
    setActiveTabId(file.id);
    setShowWelcomeScreen(false);
  };

  // Handle tab selection
  const handleTabSelect = (tabId: string) => {
    setActiveTabId(tabId);
    const file = openTabs.find(tab => tab.id === tabId) || null;
    setSelectedFile(file);
    setShowWelcomeScreen(false);
  };

  // Handle tab close
  const handleTabClose = (tabId: string) => {
    setOpenTabs(prev => prev.filter(tab => tab.id !== tabId));
    
    // If closing the active tab, switch to another tab if available
    if (tabId === activeTabId) {
      const remainingTabs = openTabs.filter(tab => tab.id !== tabId);
      if (remainingTabs.length > 0) {
        setActiveTabId(remainingTabs[0].id);
        setSelectedFile(remainingTabs[0]);
      } else {
        setActiveTabId(null);
        setSelectedFile(null);
        setShowWelcomeScreen(true);
      }
    }
  };

  // Handle code changes
  const handleCodeChange = (content: string) => {
    if (selectedFile) {
      setFileContents(prev => ({
        ...prev,
        [selectedFile.id]: content
      }));
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  // Toggle terminal
  const toggleTerminal = () => {
    setIsTerminalVisible(prev => !prev);
  };

  // Handle opening in VS Code CDE
  const handleOpenInVSCodeCDE = () => {
    toast({
      title: "Opening Full Cloud Development Environment",
      description: "Launching your project with full terminal and extension support...",
    });
    
    // Updated to point to GitHub Codespaces URL
    window.open('https://github.dev/codespaces', '_blank');
  };

  return (
    <div className="flex flex-col h-screen bg-vscode-bg text-gray-300">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} onToggleTerminal={toggleTerminal} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={cn("h-full flex", !isSidebarExpanded && "w-12", isSidebarExpanded && "w-72")}>
          <Sidebar 
            activeView={sidebarView} 
            onViewChange={setSidebarView} 
            isExpanded={isSidebarExpanded}
            onOpenInCodespace={handleOpenInVSCodeCDE}
          />
          
          {/* File Explorer (only shown when sidebar is expanded and explorer is active) */}
          {isSidebarExpanded && sidebarView === 'explorer' && (
            <div className="flex-1 overflow-hidden">
              <FileExplorer 
                files={sampleFiles} 
                onFileSelect={handleFileSelect}
                selectedFileId={selectedFile?.id || null}
              />
            </div>
          )}
        </div>
        
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <TabBar 
            tabs={openTabs.map(tab => ({ id: tab.id, title: tab.name, language: tab.language }))}
            activeTabId={activeTabId}
            onTabSelect={handleTabSelect}
            onTabClose={handleTabClose}
          />
          
          {/* Editor Content or Welcome Screen */}
          <div className="flex-1 overflow-hidden">
            {selectedFile ? (
              <CodeEditor 
                content={fileContents[selectedFile.id] || selectedFile.content || ''}
                language={selectedFile.language}
                onChange={handleCodeChange}
              />
            ) : (
              <div className="h-full flex items-center justify-center flex-col text-gray-300">
                {showWelcomeScreen && (
                  <div className="max-w-md text-center p-6 bg-vscode-active-tab rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Cloud Development Environment</h1>
                    <p className="mb-6 text-gray-400">Launch a full VS Code environment with terminal access, extensions, and Git integration</p>
                    
                    <Button 
                      onClick={handleOpenInVSCodeCDE}
                      size="lg"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors mb-4"
                    >
                      <Code size={20} />
                      Launch Full VS Code
                      <ExternalLink size={16} className="ml-1" />
                    </Button>
                    
                    <div className="flex justify-between mt-6">
                      <div className="text-left">
                        <h3 className="text-sm font-medium mb-1">GitHub Codespaces</h3>
                        <p className="text-xs text-gray-500">Complete development environment</p>
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-medium mb-1">Gitpod</h3>
                        <p className="text-xs text-gray-500">Cloud workspace</p>
                      </div>
                    </div>
                    
                    <p className="mt-4 text-xs text-gray-500">
                      Your development environment will open with full terminal access and extension support
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Terminal Panel */}
          {isTerminalVisible && (
            <div className="h-1/3 border-t border-gray-800">
              <Terminal initialText="Welcome to VS Code Cloud Terminal (Demo)" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
