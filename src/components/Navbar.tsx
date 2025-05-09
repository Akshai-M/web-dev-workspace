
import { Menu, Play, Code, Settings, Terminal as TerminalIcon } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
  onToggleTerminal: () => void;
}

const Navbar = ({ onToggleSidebar, onToggleTerminal }: NavbarProps) => {
  return (
    <div className="flex items-center h-10 bg-vscode-bg border-b border-gray-800 px-2">
      <button 
        className="p-1.5 rounded hover:bg-gray-700 focus:outline-none" 
        onClick={onToggleSidebar}
        title="Toggle Sidebar"
      >
        <Menu size={18} />
      </button>
      
      <div className="ml-4 text-sm">VSCode Cloud</div>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center space-x-2">
        <button className="p-1.5 rounded hover:bg-gray-700 focus:outline-none" title="Run Code">
          <Play size={18} />
        </button>
        
        <button className="p-1.5 rounded hover:bg-gray-700 focus:outline-none" title="Extensions">
          <Code size={18} />
        </button>
        
        <button 
          className="p-1.5 rounded hover:bg-gray-700 focus:outline-none" 
          onClick={onToggleTerminal}
          title="Toggle Terminal"
        >
          <TerminalIcon size={18} />
        </button>
        
        <button className="p-1.5 rounded hover:bg-gray-700 focus:outline-none" title="Settings">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
