
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

const Index = () => {
  const [sidebarView, setSidebarView] = useState('explorer');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [openTabs, setOpenTabs] = useState<FileItem[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});

  // Handle file selection
  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    
    // If file is not already in open tabs, add it
    if (!openTabs.some(tab => tab.id === file.id)) {
      setOpenTabs(prev => [...prev, file]);
    }
    
    setActiveTabId(file.id);
  };

  // Handle tab selection
  const handleTabSelect = (tabId: string) => {
    setActiveTabId(tabId);
    const file = openTabs.find(tab => tab.id === tabId) || null;
    setSelectedFile(file);
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

  // Handle opening in Codespace
  const handleOpenInCodespace = () => {
    // In a real implementation, this would trigger an API call or redirect
    toast({
      title: "Opening project in GitHub Codespaces",
      description: "You would be redirected to a full VS Code environment.",
    });
    
    // For demo purposes, open in a new tab
    window.open('https://github.com/features/codespaces', '_blank');
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
            onOpenInCodespace={handleOpenInCodespace}
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
          
          {/* Editor Content */}
          <div className="flex-1 overflow-hidden">
            {selectedFile ? (
              <CodeEditor 
                content={fileContents[selectedFile.id] || selectedFile.content || ''}
                language={selectedFile.language}
                onChange={handleCodeChange}
              />
            ) : (
              <div className="h-full flex items-center justify-center flex-col text-gray-500">
                <p className="text-xl mb-2">Welcome to VSCode Cloud</p>
                <p className="text-sm">Select a file to start editing</p>
              </div>
            )}
          </div>
          
          {/* Terminal Panel */}
          {isTerminalVisible && (
            <div className="h-1/3 border-t border-gray-800">
              <Terminal initialText="Welcome to VSCode Cloud Terminal" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
