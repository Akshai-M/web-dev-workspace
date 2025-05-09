
export interface FileItem {
  id: string;
  name: string;
  type: 'file';
  language?: string;
  content?: string;
}

export interface FolderItem {
  id: string;
  name: string;
  type: 'folder';
  items: (FileItem | FolderItem)[];
}

export type ExplorerItem = FileItem | FolderItem;

const sampleFiles: ExplorerItem[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    items: [
      {
        id: 'app',
        name: 'app',
        type: 'folder',
        items: [
          {
            id: 'page',
            name: 'page.tsx',
            type: 'file',
            language: 'typescript',
            content: `'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Next.js Cloud IDE
      </h1>
      <p className="mb-4">Welcome to your cloud development environment!</p>
      <button 
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
    </main>
  )
}`
          },
          {
            id: 'layout',
            name: 'layout.tsx',
            type: 'file',
            language: 'typescript',
            content: `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`
          }
        ]
      },
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        items: [
          {
            id: 'button',
            name: 'Button.tsx',
            type: 'file',
            language: 'typescript',
            content: `interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-100"
  };
  
  return (
    <button 
      className={\`\${baseStyles} \${variantStyles[variant]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`
          },
          {
            id: 'card',
            name: 'Card.tsx',
            type: 'file',
            language: 'typescript',
            content: `interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
}`
          }
        ]
      },
      {
        id: 'styles',
        name: 'globals.css',
        type: 'file',
        language: 'css',
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}`
      }
    ]
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    items: [
      {
        id: 'favicon',
        name: 'favicon.ico',
        type: 'file'
      },
      {
        id: 'logo',
        name: 'logo.png',
        type: 'file'
      }
    ]
  },
  {
    id: 'package',
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: `{
  "name": "nextjs-cloud-ide",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18",
    "react-dom": "^18",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "14.0.0",
    "postcss": "^8",
    "typescript": "^5"
  }
}`
  },
  {
    id: 'tsconfig',
    name: 'tsconfig.json',
    type: 'file',
    language: 'json',
    content: `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`
  },
  {
    id: 'readme',
    name: 'README.md',
    type: 'file',
    language: 'markdown',
    content: `# Next.js Cloud IDE

This is a Next.js project that simulates a cloud-based development environment similar to VS Code in the browser.

## Features

- File explorer
- Code editing
- Terminal emulation
- Syntax highlighting

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
`
  }
];

export default sampleFiles;
