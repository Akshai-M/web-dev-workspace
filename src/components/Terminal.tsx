import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface TerminalProps {
  initialText?: string;
}

const Terminal = ({ initialText = 'Welcome to VSCode Cloud Terminal' }: TerminalProps) => {
  const [history, setHistory] = useState<string[]>([
    initialText,
    'NOTE: For full terminal functionality, please use the "Launch VS Code" button in the sidebar.',
    'This will open a complete cloud development environment with terminal access via GitHub Codespaces or Gitpod.'
  ]);
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('$ ');
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Basic terminal simulation
      const command = input.trim();
      let response = '';
      
      if (command) {
        if (command === 'clear') {
          setHistory([
            'Terminal cleared.',
            'NOTE: For full terminal functionality, please use the "Launch VS Code" button.'
          ]);
          setInput('');
          return;
        } else if (command === 'help') {
          response = 'Available commands: help, clear, echo, ls, pwd\n\nFor full terminal functionality, launch GitHub Codespaces or Gitpod from the Development Environments tab.';
        } else if (command.startsWith('echo ')) {
          response = command.substring(5);
        } else if (command === 'ls') {
          response = 'index.html\nstyle.css\nscript.js\npackage.json';
        } else if (command === 'pwd') {
          response = '/home/user/project';
        } else if (command === 'npm' || command === 'yarn' || command === 'pnpm' || command.startsWith('npm ') || command.startsWith('yarn ') || command.startsWith('pnpm ')) {
          response = 'Package management commands require a full cloud development environment.\nPlease use the "Launch VS Code" button to access GitHub Codespaces or Gitpod with full terminal functionality.';
          toast({
            title: "Full terminal access required",
            description: "Package management commands are available in GitHub Codespaces or Gitpod.",
          });
        } else {
          response = `Command not found: ${command}\nFor full terminal functionality, please launch GitHub Codespaces or Gitpod.`;
        }
      }
      
      setHistory(prev => [
        ...prev, 
        `${prompt}${input}`,
        response
      ].filter(Boolean));
      
      setInput('');
    }
  };
  
  return (
    <div className="h-full bg-vscode-terminal text-gray-300 p-2 font-mono text-sm overflow-auto flex flex-col">
      <div className="flex-1 overflow-auto" ref={terminalRef}>
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap mb-1">{line}</div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="mr-2">{prompt}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-gray-300"
          autoFocus
        />
        <span className="terminal-cursor">|</span>
      </div>
    </div>
  );
};

export default Terminal;
