
import { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileItem {
  id: string;
  name: string;
  type: 'file';
  language?: string;
  content?: string;
}

interface FolderItem {
  id: string;
  name: string;
  type: 'folder';
  items: (FileItem | FolderItem)[];
  expanded?: boolean;
}

type ExplorerItem = FileItem | FolderItem;

interface FileExplorerProps {
  files: ExplorerItem[];
  onFileSelect: (file: FileItem) => void;
  selectedFileId: string | null;
}

const FileExplorer = ({ files, onFileSelect, selectedFileId }: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'root': true
  });

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const renderItem = (item: ExplorerItem, depth = 0) => {
    const isExpanded = expandedFolders[item.id] || false;
    const isSelected = selectedFileId === item.id;
    
    if (item.type === 'folder') {
      return (
        <div key={item.id}>
          <div 
            className={cn(
              "flex items-center py-1 px-2 text-sm file-explorer-item",
              isSelected && "active"
            )}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={() => toggleFolder(item.id)}
          >
            <span className="mr-1">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
            <Folder size={16} className="mr-2" />
            <span>{item.name}</span>
          </div>
          
          {isExpanded && (
            <div>
              {item.items.map(childItem => renderItem(childItem, depth + 1))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div 
        key={item.id}
        className={cn(
          "flex items-center py-1 px-2 text-sm file-explorer-item",
          isSelected && "active"
        )}
        style={{ paddingLeft: `${depth * 12 + 24}px` }}
        onClick={() => onFileSelect(item)}
      >
        <File size={16} className="mr-2" />
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      {files.map(item => renderItem(item))}
    </div>
  );
};

export default FileExplorer;
