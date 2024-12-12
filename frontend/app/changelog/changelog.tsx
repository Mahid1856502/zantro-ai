import Link from "next/link";
import React from "react";
import { Code2, MessageSquare, Terminal, Workflow, Package } from "lucide-react";

type ChangelogEntry = {
  date: string;
  title: string;
  description: React.ReactNode;
  version: string;
  screenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const updates: ChangelogEntry[] = [
  {
    date: "November 19, 2024",
    title: "Local Model Support & AI Features",
    version: "v3.4.0",
    description: (
      <>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Package className="h-4 w-4" />
          <span>Implemented by <Link href="https://github.com/furaar" className="text-primary-600 hover:underline">@furaar</Link></span>
        </div>

        <h2 className="mt-6 text-xl font-semibold">🤖 AI Model Support</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added support for local AI models
            <div className="mt-2 text-sm text-gray-600">
              Now supporting: <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">Claude 3.5 Sonnet</code>, 
              <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">WhiteRabbitNeo</code>, 
              <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">Llama 3.2</code>,
              <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">DeepSeek-Coder-V2</code>,
              <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">Qwen 2.5 Coder</code>
            </div>
          </li>
          <li>Implemented region-specific model availability</li>
          <li>Enhanced AI chat capabilities for VM control</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">🚀 Feature Updates</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added natural language VM control
            <div className="mt-2 text-sm text-gray-600">
              Control Chrome for OSINT research and automate tasks through conversation
            </div>
          </li>
          <li>Enhanced code editor features
            <div className="mt-2 text-sm text-gray-600">
              Added syntax highlighting and AI-powered code suggestions
            </div>
          </li>
          <li>Implemented cloud storage system
            <div className="mt-2 text-sm text-gray-600">
              Centralized file management across VMs with quick search and preview
            </div>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">⚙️ Environment Updates</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added support for pre-configured distros
            <div className="mt-2 text-sm text-gray-600">
              Including Kali Linux, REMnux, and ParrotOS with KDE Plasma
            </div>
          </li>
          <li>Enhanced custom build options
            <div className="mt-2 text-sm text-gray-600">
              Support for Ubuntu, Fedora, Debian with multiple desktop environments
            </div>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">🎨 UI Improvements</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Implemented blueprint grid layout system</li>
          <li>Enhanced mobile responsiveness</li>
          <li>Updated pricing text colors for better contrast</li>
          <li>Added features section to homepage</li>
        </ul>
      </>
    ),
    screenshot: {
      src: "/changelog/v3.4.0-grid.webp",
      alt: "New grid layout system",
      width: 800,
      height: 450
    }
  },
  {
    date: "November 12, 2024",
    title: "Major AI Chat & Networking Improvements",
    version: "v3.3.5",
    description: (
      <>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <MessageSquare className="h-4 w-4" />
          <span>Implemented by <Link href="https://github.com/furaar" className="text-primary-600 hover:underline">@furaar</Link></span>
        </div>

        <h2 className="mt-6 text-xl font-semibold">💬 Frontend Updates</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Implemented isolated chat functionality with WebSocket</li>
          <li>Added persistent chat history with local storage</li>
          <li>Enhanced VM selection and filtering system</li>
          <li>Major improvements to message rendering</li>
          <li>Added scroll area and dynamic loading for dropdowns</li>
          <li>Implemented secrets layout and networking changes</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">🛠 API Enhancements</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added notification read/mark routes</li>
          <li>Implemented abuse payload and install routes</li>
          <li>Added networking and binding routes</li>
          <li>Created VM with multiport support
            <div className="mt-2 text-sm text-gray-600">
              Added resources limit per user
            </div>
          </li>
          <li>Implemented secrets routes for production</li>
          <li>Updated base model structure</li>
        </ul>
      </>
    ),
    screenshot: {
      src: "/images/changelogs/chat.png",
      alt: "New chat interface",
      width: 800,
      height: 450
    }
  },
  {
    date: "November 9, 2024",
    title: "Editor & Marketplace Enhancements",
    version: "v3.3.0",
    description: (
      <>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Code2 className="h-4 w-4" />
          <span>Implemented by <Link href="https://github.com/furaar" className="text-primary-600 hover:underline">@furaar</Link></span>
        </div>

        <h2 className="mt-6 text-xl font-semibold">🚀 Frontend Updates</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added file history with localStorage mapping
            <div className="mt-2 text-sm text-gray-600">
              Using <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">localforage</code> for efficient storage
            </div>
          </li>
          <li>Implemented markdown previews with syntax highlighting</li>
          <li>Added format logic and prettier integration</li>
          <li>Fixed color schema for marketplace code blocks</li>
          <li>Added DOM purify types for security</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">⚙️ API Changes</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added path sanitization for security</li>
          <li>Implemented protected file paths
            <div className="mt-2 text-sm text-gray-600">
              Added save file and get file protected routes
            </div>
          </li>
        </ul>
      </>
    ),
    screenshot: {
      src: "/changelog/v3.3.0-editor.webp",
      alt: "New editor interface",
      width: 800,
      height: 450
    }
  },
  {
    date: "October 21, 2024",
    title: "System Monitoring & Rich Editor Integration",
    version: "v3.2.0",
    description: (
      <>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Workflow className="h-4 w-4" />
          <span>Implemented by <Link href="https://github.com/furaar" className="text-primary-600 hover:underline">@furaar</Link></span>
        </div>

        <h2 className="mt-6 text-xl font-semibold">🛠️ HackerX Toolkit</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Implemented Puck rich editor integration
            <div className="mt-2 text-sm text-gray-600">
              Enhanced with <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">@measured/puck</code> for drag-and-drop report editing
            </div>
          </li>
          <li>Added attack planning features
            <div className="mt-2 text-sm text-gray-600">
              Integrated Excalidraw for attack flow diagrams and network layouts
            </div>
          </li>
          <li>Enhanced report templates
            <div className="mt-2 text-sm text-gray-600">
              Added templates for Web Security, Network Security, and Special Assessments
            </div>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">🔧 System Features</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added system host usage monitoring
            <div className="mt-2 text-sm text-gray-600">
              Using <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">node-os-utils</code> for real-time metrics
            </div>
          </li>
          <li>Implemented token refresh mechanism</li>
          <li>Enhanced profile rendering optimizations</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">🌐 Networking</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Basic interpreter integration through WebSocket</li>
          <li>Added initial networking services structure</li>
          <li>Implemented basic VM communication layer</li>
        </ul>
      </>
    )
  },
  {
    date: "October 6, 2024",
    title: "Chat System & VM Management",
    version: "v3.1.0",
    description: (
      <>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Terminal className="h-4 w-4" />
          <span>Implemented by <Link href="https://github.com/furaar" className="text-primary-600 hover:underline">@furaar</Link></span>
        </div>

        <div className="my-6 rounded-xl overflow-hidden">
          <img
            src="https://raw.githubusercontent.com/microsoft/terminal/main/res/terminal.png"
            alt="Terminal Integration"
            className="w-full h-auto"
          />
        </div>

        <h2 className="mt-6 text-xl font-semibold">🚀 Core Features</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Implemented basic chatbox functionality
            <div className="mt-2 text-sm text-gray-600">
              Using <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">@vercel/ai</code> for streaming responses
            </div>
          </li>
          <li>Added user tiers system with role-based access</li>
          <li>Enhanced VM selection interface
            <div className="mt-2 text-sm text-gray-600">
              Integrated <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">xterm.js</code> for terminal functionality
            </div>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">🎨 UI Enhancements</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added watermark search functionality</li>
          <li>Improved sidemenu with toggle feature</li>
          <li>Enhanced workspace layout with grid system</li>
        </ul>
      </>
    )
  },
  {
    date: "October 3, 2024",
    title: "HackerX Toolkit & Layout Improvements",
    version: "v3.0.0",
    description: (
      <>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Code2 className="h-4 w-4" />
          <span>Implemented by <Link href="https://github.com/furaar" className="text-primary-600 hover:underline">@furaar</Link></span>
        </div>

        <div className="my-6 rounded-xl overflow-hidden">
          <img
            src="https://raw.githubusercontent.com/microsoft/vscode/main/resources/linux/code.png"
            alt="Code Editor Integration"
            className="w-full h-auto"
          />
        </div>

        <h2 className="mt-6 text-xl font-semibold">🛠️ Toolkit Features</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Added basic HackerX toolkit UI
            <div className="mt-2 text-sm text-gray-600">
              Integrated with <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">react-grid-layout</code>
            </div>
          </li>
          <li>Implemented VM action calling system</li>
          <li>Added automatic tab management
            <div className="mt-2 text-sm text-gray-600">
              Using <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800">@dnd-kit/core</code> for drag and drop
            </div>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">📱 Layout & UX</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li>Improved workspace layout with persistent storage</li>
          <li>Added context menu for report operations</li>
          <li>Enhanced mobile responsiveness</li>
        </ul>
      </>
    )
  }
];

export default updates;