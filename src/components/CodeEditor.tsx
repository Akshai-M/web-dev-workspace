
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  content: string;
  language?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor = ({ content = '', language = 'javascript', onChange, readOnly = false }: CodeEditorProps) => {
  const [value, setValue] = useState(content);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  useEffect(() => {
    setValue(content);
  }, [content]);

  useEffect(() => {
    // Generate line numbers based on content
    const lines = (content || '').split('\n').length;
    setLineNumbers(Array.from({ length: Math.max(1, lines) }, (_, i) => i + 1));
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    if (!code) return '';
    
    // This is a very simplified version - real syntax highlighting would be more complex
    // In a real app, you'd use a library like Prism.js or highlight.js
    return code;
  };

  return (
    <div className="relative h-full font-mono text-sm">
      <div className="flex h-full">
        {/* Line numbers */}
        <div className="bg-vscode-editor py-2 text-right pr-2 select-none text-gray-500">
          {lineNumbers.map(num => (
            <div key={num} className="px-2">{num}</div>
          ))}
        </div>
        
        {/* Editor area */}
        <textarea
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          className={cn(
            "bg-vscode-editor text-gray-300 p-2 resize-none outline-none w-full h-full",
            "border-none overflow-auto whitespace-pre"
          )}
          spellCheck="false"
          placeholder="Start coding here..."
          style={{ fontFamily: 'Menlo, Monaco, Courier New, monospace' }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
