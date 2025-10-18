import React, { useState, useEffect, useRef } from 'react';
import { Settings, X, Minimize, Maximize, BookOpen, Home, Monitor, FileText, LifeBuoy, Network, Wrench, TerminalSquare, Code, Package, Sparkles, Info, PlusSquare, Download, ListChecks, Copy, Check, AlertTriangle, Send, ChevronDown, ChevronsRight, MessageSquare } from 'lucide-react';

// --- Data Structures ---

const showroomData = {
  "Home": {
    icon: <Home size={18} />,
    type: 'home_dashboard',
    description: "Welcome to KeyCrate! Your central hub for shortcuts and commands.",
  },
  "Shortcut Bible": {
    icon: <BookOpen size={18} />,
    type: 'bible_view',
    description: "A comprehensive reference list of shortcuts for Windows, applications, and more. Use the search bar to quickly find what you need.",
  },
  "Windows Shortcuts": {
    icon: <Monitor size={18} />,
    type: 'list',
    description: "A collection of essential shortcuts using the Windows key for navigating the OS, opening applications, and managing your desktop.",
    example: "Action: Press (Win+E) > Navigate Folders > Press (Win+L) to Lock",
    items: [
      { keys: ["Win", "E"], description: "Open File Explorer" },
      { keys: ["Win", "L"], description: "Lock Computer" },
      { keys: ["Win", "I"], description: "Open Settings" },
      { keys: ["Win", "R"], description: "Open Run Dialog" },
      { keys: ["Win", "Tab"], description: "Open Task View" },
      { keys: ["Win", "V"], description: "Open Clipboard History" },
      { keys: ["Win", "X"], description: "Open Quick Link Menu" },
      { keys: ["Win", "Shift", "S"], description: "Open Snipping Tool" },
    ]
  },
  "Document & Text Editing": {
    icon: <FileText size={18} />,
    type: 'list',
    description: "Universal shortcuts for manipulating text in documents, web pages, and text editors. Master these to speed up your writing and editing workflow.",
    example: "Action: Select text > Press (Ctrl+C) > Move cursor > Press (Ctrl+V)",
    items: [
        { keys: ["Ctrl", "A"], description: "Select all text" },
        { keys: ["Ctrl", "C"], description: "Copy selected text" },
        { keys: ["Ctrl", "X"], description: "Cut selected text" },
        { keys: ["Ctrl", "V"], description: "Paste from clipboard" },
        { keys: ["Ctrl", "Z"], description: "Undo last action" },
        { keys: ["Ctrl", "S"], description: "Save current document" },
    ]
  },
  "Troubleshooting & Diagnostics": {
    icon: <LifeBuoy size={18} />,
    type: 'mixed_content',
    description: "Powerful commands and tools for diagnosing system issues, repairing corrupted files, and managing system services. Use with caution.",
    example: "Action: Run CMD as Admin > Copy a command below > Paste into terminal > Press Enter",
    sections: [
      {
        subheading: "System Repair Commands (Admin Required)",
        type: 'table',
        headers: ["Command", "Description"],
        items: [
          { col1: 'sfc /scannow', col2: 'System File Checker: Scans and repairs system files.', warning: true },
          { col1: 'chkdsk /f /r', col2: 'Check Disk: Scans and repairs disk errors. Requires reboot.', warning: true },
          { col1: 'dism /online /cleanup-image /restorehealth', col2: 'DISM: Repairs Windows image components.', warning: true },
        ]
      },
      {
        subheading: "Diagnostic Tools (via Win+R)",
        type: 'table',
        headers: ["Command", "Opens"],
        items: [
          { col1: 'msconfig', col2: "System Configuration (boot, services, startup)" },
          { col1: 'regedit', col2: "Registry Editor. Incorrect changes can cause system instability.", warning: true },
          { col1: 'services.msc', col2: "Windows Services Management" },
          { col1: 'eventvwr.msc', col2: "Event Viewer (System logs)" },
          { col1: 'devmgmt.msc', col2: "Device Manager" },
        ]
      },
    ]
  },
   "Networking Commands": {
    icon: <Network size={18} />,
    type: 'table',
    description: "A list of command-line tools for inspecting network configurations, testing connectivity, and troubleshooting network-related problems.",
    example: "Action: Run CMD > Copy 'ping 8.8.8.8' > Paste into CMD > Press Enter",
    headers: ["Command", "Description"],
    items: [
        { col1: 'ping [host]', col2: 'Tests connectivity to a specific IP address or domain.' },
        { col1: 'ipconfig /all', col2: 'Displays full TCP/IP configuration for all adapters.' },
        { col1: 'tracert [host]', col2: 'Traces the route packets take to a network host.' },
        { col1: 'netstat -an', col2: 'Displays all active TCP connections and listening ports.' },
        { col1: 'nslookup [domain]', col2: 'Queries DNS to obtain domain name or IP address mapping.' },
        { col1: 'arp -a', col2: 'Displays the IP-to-MAC address mapping table.' },
        { col1: 'route print', col2: 'Displays the IP routing table.', warning: true },
        { col1: 'getmac', col2: 'Displays the MAC address for all network adapters.' },
        { col1: 'pathping [host]', col2: 'Combines ping and tracert to diagnose packet loss over a route.' },
        { col1: 'netsh interface show interface', col2: 'Shows all network interfaces on the system.', warning: true },
    ]
  },
  "Windows Tools": {
    icon: <Wrench size={18} />,
    type: 'table',
    description: "Quickly launch built-in Windows utilities directly from the Run dialog (Win + R) or a command line. These tools provide access to key system settings and information.",
    example: "Action: Press (Win+R) > Copy 'rstrui.exe' > Paste into Run > Press Enter",
    headers: ["Tool", "Command-line"],
    items: [
        { col1: 'System Restore', col2: 'rstrui.exe' },
        { col1: 'System Properties', col2: 'sysdm.cpl' },
        { col1: 'Services', col2: 'services.msc' },
        { col1: 'Resource Monitor', col2: 'resmon.exe' },
    ]
  },
  "CMD & PowerShell": {
    icon: <TerminalSquare size={18} />,
    type: 'mixed_content',
    description: "Fundamental commands for navigating the file system and managing processes using the Command Prompt (CMD) and the more advanced PowerShell.",
    example: "Action: Open Terminal > Type 'cd [folder]' & Enter > Type 'mkdir new_project' & Enter",
    sections: [
        { subheading: "File & Directory Navigation", type: 'table', headers: ["Command", "Description"], items: [
            { col1: 'dir | ls', col2: 'List files and directories.' },
            { col1: 'cd [path]', col2: 'Change directory.' },
            { col1: 'mkdir [name]', col2: 'Create a new directory.' },
            { col1: 'copy [src] [dest]', col2: 'Copy a file.' },
            { col1: 'move [src] [dest]', col2: 'Move or rename a file.' },
            { col1: 'del [file] | rm [file]', col2: 'Delete a file.', warning: true },
        ]},
        { subheading: "System & Process Management (PowerShell)", type: 'table', headers: ["Command", "Description"], items: [
            { col1: 'Get-Process', col2: 'Lists all running processes.' },
            { col1: 'Stop-Process -Name "[name]"', col2: 'Terminates a process by its name.', warning: true },
            { col1: 'Get-Service', col2: 'Lists all system services.' },
            { col1: 'Restart-Computer', col2: 'Restarts the local computer.', warning: true },
        ]}
    ]
  },
  "Web Development": {
    icon: <Code size={18} />,
    type: 'mixed_content',
    description: "Essential command-line tools for modern web development, including managing packages with NPM and version control with Git.",
    example: "Action: Open Terminal in Project Folder > Run 'npm install' > Run 'npm run dev'",
    sections: [
        { subheading: "NPM (Node Package Manager)", type: 'table', headers: ["Command", "Description"], items: [
            { col1: 'npm install', col2: 'Install all dependencies from package.json.' },
            { col1: 'npm run dev', col2: 'Run the development script (common convention).' },
        ]},
        { subheading: "Git (Version Control)", type: 'table', headers: ["Command", "Description"], items: [
            { col1: 'git clone [url]', col2: 'Copy a remote repository to your local machine.' },
            { col1: 'git status', col2: 'Show the current status of your working directory.' },
        ]}
    ]
  },
  "NPM Commands": {
    icon: <Package size={18} />,
    type: 'mixed_content',
    description: "A comprehensive reference for the npm command-line interface, including configuration flags and shorthands for managing Node.js packages.",
    example: "Action: Open Terminal in Project Folder > Run 'npm install --save-dev [package]'",
    sections: [
        { subheading: "Common Command Shorthands", type: 'table', headers: ["Shorthand", "Full Command"], items: [
            { col1: '-g', col2: '--global' },
            { col1: '-S', col2: '--save' },
            { col1: '-D', col2: '--save-dev' },
            { col1: '-O', col2: '--save-optional' },
            { col1: '-E', col2: '--save-exact' },
            { col1: '-f', col2: '--force' },
            { col1: '-y', col2: '--yes' },
            { col1: '-l', col2: '--long' },
        ]},
        { subheading: "Essential Configuration Settings", type: 'table', headers: ["Config Flag", "Description"], items: [
            { col1: '--access', col2: 'Sets the access level for scoped packages. Default: public.' },
            { col1: '--audit-level', col2: 'Minimum vulnerability level to exit with an error. Values: info, low, moderate, high, critical.' },
            { col1: '--dry-run', col2: 'Reports what would have been done without making changes.' },
            { col1: '--force', col2: 'Removes various protections. Use with caution.', warning: true },
            { col1: '--global', col2: 'Operates in global mode, installing packages into the prefix folder.' },
            { col1: '--ignore-scripts', col2: 'Does not run scripts specified in package.json files.' },
            { col1: '--json', col2: 'Output JSON data instead of normal output.' },
            { col1: '--legacy-peer-deps', col2: 'Ignores all peerDependencies, similar to npm v4-6.' },
            { col1: '--omit=dev', col2: 'Omits devDependencies from the install tree.' },
            { col1: '--package-lock', col2: 'Enable/disable package-lock.json files. Default: true.' },
            { col1: '--registry', col2: 'The base URL of the npm registry.' },
            { col1: '--save-dev', col2: 'Save installed packages as devDependencies.' },
            { col1: '--save-exact', col2: 'Save exact versions rather than using semver ranges.' },
            { col1: '--strict-peer-deps', col2: 'Treats conflicting peerDependencies as an install failure.', warning: true },
        ]}
    ]
  },
  "Python & Scripting": {
    icon: <Sparkles size={18} />,
    type: 'table',
    description: "Common commands for managing Python environments and packages using `pip` and `venv`.",
    example: "Action: Open Terminal in Project Folder > Run 'python -m venv venv' > Activate > Run 'pip install ...'",
    headers: ["Command", "Description"],
    items: [
        { col1: 'python --version', col2: 'Check your installed Python version.' },
        { col1: 'python -m venv venv', col2: 'Create a virtual environment named "venv".' },
        { col1: '.\\venv\\Scripts\\activate', col2: 'Activate the virtual environment (Windows).' },
        { col1: 'pip install [package]', col2: 'Install a package from PyPI.' },
        { col1: 'pip install -r requirements.txt', col2: 'Install all packages from a requirements file.' },
        { col1: 'pip freeze > requirements.txt', col2: 'Save all installed packages to a file.' },
    ]
  },
   "What's New": {
    icon: <Info size={18} />,
    type: 'release_notes',
    description: "Keep up with the latest changes, bug fixes, and new features in KeyCrate.",
  },
  "My Custom Shortcuts": {
    icon: <PlusSquare size={18} />,
    type: 'custom_creator',
    description: "Create your own global shortcuts. Add your most-used commands, file paths, or URLs here for quick access.",
    example: "Action: Define Shortcut > Add to Toolbox > Launch Toolbox for Quick Access",
    items: []
  },
};


// --- Reusable Components ---
const Key = ({ children, theme }) => (
  <kbd className={`px-2 py-1 text-xs font-semibold rounded mx-0.5 ${theme === 'dark' ? 'bg-gray-600 text-gray-100 border-b-2 border-gray-500' : 'bg-gray-300 text-gray-800 border-b-2 border-gray-400'}`}>
    {children}
  </kbd>
);

const TooltipButton = ({ onClick, title, children, className }) => (
    <button onClick={onClick} title={title} className={`p-1 rounded ${className}`}>
        {children}
    </button>
);

const WorkflowExample = ({ theme, example }) => {
    const [title, steps] = example.split(':');
    return (
        <div className={`flex items-center gap-2 p-2 rounded-md text-xs font-mono mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <span className="font-bold text-gray-500 flex-shrink-0">{title.trim()}:</span>
            <div className="flex items-center gap-2 overflow-x-auto">
                {steps.split('>').map((step, index, arr) => (
                    <React.Fragment key={index}>
                        <span className={`${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'} whitespace-nowrap`}>{step.trim()}</span>
                        {index < arr.length - 1 && <ChevronsRight size={14} className="text-gray-500 flex-shrink-0" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const Modal = ({ theme, onClose, children }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
        <div className={`rounded-lg shadow-2xl p-6 w-full max-w-md border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
);

// --- Menu Bar Component ---
const MenuBar = ({ theme, setTheme, setIsToolboxOpen, setToolboxItems, setActiveCategory, setShowAboutModal, checkForUpdates }) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const menuRef = useRef(null);

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            // Parse content and set toolboxItems/customShortcuts (simplified placeholder)
            console.log('Imported:', content);
            alert('Import successful!');
        };
        reader.readAsText(file);
    };

    const menuItems = {
        File: [
            { name: 'Import My Shortcuts & Toolbox...', action: () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.txt,.json';
                input.onchange = handleImport;
                input.click();
            } },
            { name: 'Export My Shortcuts & Toolbox...', action: () => alert('Export functionality: Use toolbox export for now.') },
            { name: 'Print Current View', action: () => window.print() },
        ],
        Tools: [
            { name: 'Launch Toolbox', action: () => setIsToolboxOpen(true) },
            { name: 'Clear Toolbox Items', action: () => setToolboxItems([]) },
            { name: 'Go to My Custom Shortcuts', action: () => setActiveCategory('My Custom Shortcuts') },
        ],
        View: [
            { name: 'Toggle Theme', action: () => setTheme(theme === 'dark' ? 'light' : 'dark') },
        ],
        Help: [
            { name: 'About KeyCrate', action: () => setShowAboutModal(true) },
            { name: 'Check for Updates...', action: checkForUpdates },
            { name: 'Online Documentation', action: () => window.open('https://github.com/example/keycrate', '_blank') },
        ],
    };

    useEffect(() => {
        const handleClickOutside = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) setActiveMenu(null); };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className={`relative flex items-center h-8 px-2 border-b ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
            {Object.keys(menuItems).map(menu => (
                <div key={menu} className="relative">
                    <button onClick={() => setActiveMenu(activeMenu === menu ? null : menu)} className={`px-3 py-1 text-sm rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} ${activeMenu === menu ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''}`}>{menu}</button>
                    {activeMenu === menu && (<div className={`absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg py-1 z-20 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>{menuItems[menu].map(item => (<button key={item.name} onClick={() => { item.action(); setActiveMenu(null); }} className={`w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>{item.name}</button>))}</div>)}
                </div>
            ))}
        </div>
    );
};


// --- Productivity Toolbox Component (The Pop-out) ---
const ProductivityToolboxApp = ({ theme, onClose, toolboxItems, setToolboxItems, handleCopyToClipboard, copiedCmd }) => {
    const [isPinned, setIsPinned] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [checklistMode, setChecklistMode] = useState(false);
    const dragRef = useRef(null);
    const menuRef = useRef(null);
    const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 100 });
    
    const handleRemoveItem = (id) => setToolboxItems(prev => prev.filter(item => item.id !== id));
    
    const handleToggleComplete = (id) => {
        setToolboxItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    };

    const exportToolbox = () => {
        let content = "My Toolbox Items:\n\n";
        toolboxItems.forEach(item => {
            if (item.type === 'shortcut') {
                content += `[Shortcut] ${item.content.keys.join(' + ')}: ${item.content.description}\n`;
            } else if (item.type === 'command') {
                content += `[Command] ${item.content.command}: ${item.content.description}\n`;
            }
        });
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my_toolbox.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        const handleMouseMove = (e) => { 
            if (dragRef.current?.isDragging) {
                let newX = e.clientX - dragRef.current.offsetX;
                let newY = e.clientY - dragRef.current.offsetY;
                // Boundary checks
                newX = Math.max(0, Math.min(window.innerWidth - 400, newX));
                newY = Math.max(0, Math.min(window.innerHeight - 300, newY)); // Approximate height
                setPosition({ x: newX, y: newY });
            }
        };
        const handleMouseUp = () => { if(dragRef.current) dragRef.current.isDragging = false; };
        const handleClickOutside = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false); };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousedown', handleClickOutside);
        return () => { 
            window.removeEventListener('mousemove', handleMouseMove); 
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMouseDown = (e) => { dragRef.current = { isDragging: true, offsetX: e.clientX - position.x, offsetY: e.clientY - position.y }; };
    const themeClasses = theme === 'dark' ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-300';

    return (
        <div className={`fixed w-[400px] max-h-[60vh] rounded-xl shadow-2xl flex flex-col border z-50 ${themeClasses}`} style={{ top: position.y, left: position.x }}>
            <div onMouseDown={handleMouseDown} className={`flex items-center justify-between h-10 px-2 select-none cursor-grab flex-shrink-0 ${theme === 'dark' ? 'bg-gray-900/70' : 'bg-gray-200/70'}`}>
                <span className="font-bold text-sm ml-2">My Toolbox</span>
                <div className="flex items-center space-x-1">
                   <div className="relative" ref={menuRef}>
                        <TooltipButton onClick={() => setShowMenu(!showMenu)} title="Options"><Settings size={16} className="text-gray-400 hover:text-white" /></TooltipButton>
                        {showMenu && (
                            <div className={`absolute top-full right-0 mt-1 w-52 rounded-md shadow-lg py-1 z-20 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                                <button onClick={() => { setChecklistMode(!checklistMode); setShowMenu(false); }} className={`w-full text-left px-3 py-1.5 text-sm flex items-center justify-between ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><span>Enable Checklist Mode</span> {checklistMode && <Check size={14} />}</button>
                                <div className={`my-1 h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                                <button onClick={() => { exportToolbox(); setShowMenu(false); }} className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><Download size={14} /> Export Toolbox to TXT</button>
                                <button onClick={() => { setToolboxItems([]); setShowMenu(false); }} className={`w-full text-left px-3 py-1.5 text-sm ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Clear All Items</button>
                                <div className={`my-1 h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                                <button onClick={() => { alert("A customizable, floating palette for your favorite shortcuts."); setShowMenu(false); }} className={`w-full text-left px-3 py-1.5 text-sm ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>About Toolbox</button>
                            </div>
                        )}
                   </div>
                    <TooltipButton onClick={onClose} title="Close Toolbox" className="hover:bg-red-500 hover:text-white"><X size={16} /></TooltipButton>
                </div>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto">
                {toolboxItems.length === 0 ? (<div className="text-center text-sm py-8 text-gray-500"><p>Your toolbox is empty.</p><p>Click the <PlusSquare size={14} className="inline-block mx-1"/> icon to add an item.</p></div>) : (toolboxItems.map(item => (<div key={item.id} className={`p-2 rounded-md flex items-center justify-between ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200/50'} ${item.completed ? 'opacity-50' : ''}`}><div className="flex-1 overflow-hidden flex items-center gap-2">{checklistMode && <input type="checkbox" checked={!!item.completed} onChange={() => handleToggleComplete(item.id)} className="form-checkbox h-4 w-4 rounded bg-transparent" />}{item.type === 'shortcut' && (<div className={item.completed ? 'line-through' : ''}><p className="text-sm font-medium truncate">{item.content.description}</p><div className="mt-1">{item.content.keys.map((k, i) => <Key key={i} theme={theme}>{k}</Key>)}</div></div>)}{item.type === 'command' && (<div className={item.completed ? 'line-through' : ''}><p className="text-sm font-mono truncate">{item.content.command}</p><p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.content.description}</p></div>)}</div><div className="flex items-center ml-2">{item.type === 'command' && (<button onClick={() => handleCopyToClipboard(item.content.command)} title="Copy command">{copiedCmd === item.content.command ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500 hover:text-gray-300"/>}</button>)}<button onClick={() => handleRemoveItem(item.id)} title="Remove from toolbox" className="ml-2 text-gray-500 hover:text-red-500"><X size={16} /></button></div></div>)))}
            </div>
        </div>
    );
};


// --- Home Dashboard Component ---
const HomeDashboard = ({ theme, setActiveCategory }) => {
    const newsItems = [ "Tech Today: The Future of AI in Development", "Productivity Hacks: Top 10 New Windows 11 Features", "KeyCrate Blog: How to Build Your Perfect Toolbox", ];
    const [currentNews, setCurrentNews] = useState(0);
    useEffect(() => { const newsInterval = setInterval(() => { setCurrentNews(prev => (prev + 1) % newsItems.length); }, 5000); return () => clearInterval(newsInterval); }, [newsItems.length]);
    const quickLinks = [ { name: "Shortcut Bible", category: "Shortcut Bible", icon: <BookOpen size={24} /> }, { name: "My Custom Shortcuts", category: "My Custom Shortcuts", icon: <PlusSquare size={24} /> }, { name: "Web Development", category: "Web Development", icon: <Code size={24} /> }, { name: "Troubleshooting", category: "Troubleshooting & Diagnostics", icon: <LifeBuoy size={24} /> }, ];
    const shortcutOfTheDay = { keys: ["Win", "Shift", "S"], description: "Open Snipping Tool for screen capture" };
    return (
        <div>
             <h2 className="text-2xl font-bold mb-4">Home Dashboard</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg flex items-center gap-4 ${theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'}`}><div className="text-blue-500 flex-shrink-0" aria-label="Update Notification"><Bell size={24} /></div><div className="overflow-hidden"><p className="font-semibold">Update Available!</p><button onClick={() => setActiveCategory("What's New")} className="text-sm text-blue-500 hover:underline">View version 1.1 release notes</button></div></div>
                <div className={`p-4 rounded-lg flex items-center gap-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}><div className="text-gray-500 flex-shrink-0" aria-label="News"><Newspaper size={24} /></div><div className="overflow-hidden"><p className="font-semibold">News & Blogs</p><p className="text-sm text-gray-500 truncate">{newsItems[currentNews]}</p></div></div>
                <div className={`p-4 rounded-lg flex items-center gap-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}><div className="text-gray-500 flex-shrink-0" aria-label="Advertisement"><Megaphone size={24} /></div><div className="overflow-hidden"><p className="font-semibold">Advertisement</p><p className="text-sm text-gray-500 truncate">Your ad could be here!</p></div></div>
             </div>
             <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">{quickLinks.map(link => (<button key={link.name} onClick={() => setActiveCategory(link.category)} className={`p-4 rounded-lg text-center transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}><div className="flex justify-center mb-2">{link.icon}</div><p className="font-semibold text-sm">{link.name}</p></button>))}</div>
             <h3 className="text-xl font-semibold mb-4">Shortcut of the Day</h3>
             <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}><div className="flex items-center justify-between"><p className="text-sm font-medium">{shortcutOfTheDay.description}</p><div>{shortcutOfTheDay.keys.map((k, i) => <Key key={i} theme={theme}>{k}</Key>)}</div></div></div>
        </div>
    );
};

// --- Release Notes Component ---
const ReleaseNotes = ({ theme }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4">What's New in KeyCrate</h2>
        <div className="space-y-6">
            <div><h3 className="text-xl font-semibold text-green-500">Version 1.1 (Major Update)</h3><p className="text-sm text-gray-500 mb-2">Released: October 17, 2025</p><ul className="list-disc list-inside space-y-1 text-sm"><li>**New Feature:** Interactive Workflow Sandbox for guided learning.</li><li>**New Feature:** Added comprehensive "Shortcut Bible" master list.</li><li>**Improvement:** Overhauled UI for better readability.</li></ul></div>
            <div><h3 className="text-xl font-semibold text-blue-500">Version 1.0.1 (Standard Update)</h3><p className="text-sm text-gray-500 mb-2">Released: September 17, 2025</p><ul className="list-disc list-inside space-y-1 text-sm"><li>Added "Windows Tools" section.</li><li>Expanded "Networking Commands" with more utilities.</li><li>Improved search functionality.</li></ul></div>
             <div><h3 className="text-xl font-semibold text-yellow-500">Version 1.0.0 (Initial Release)</h3><p className="text-sm text-gray-500 mb-2">Released: August 17, 2025</p><ul className="list-disc list-inside space-y-1 text-sm"><li>Initial public release of KeyCrate.</li><li>Core features: Toolbox, Custom Shortcuts, Theming.</li></ul></div>
        </div>
    </div>
);

// --- Custom Shortcut Creator Component ---
const CustomCreator = ({ theme, handleAddToToolbox }) => {
    const [customShortcuts, setCustomShortcuts] = useState([]);
    const [shortcutName, setShortcutName] = useState('');
    const [keyCombo, setKeyCombo] = useState('');
    const [actionType, setActionType] = useState('url');
    const [actionValue, setActionValue] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('customShortcuts');
        if (saved) setCustomShortcuts(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('customShortcuts', JSON.stringify(customShortcuts));
    }, [customShortcuts]);

    const handleAddCustom = (e) => {
        e.preventDefault();
        if (!shortcutName.trim() || !actionValue.trim()) {
            alert("Please fill out all fields.");
            return;
        }
        const newShortcut = {
            id: `custom_${Date.now()}`,
            name: shortcutName,
            keys: keyCombo.split('+').map(k => k.trim()),
            actionType,
            action: actionValue,
        };
        setCustomShortcuts(prev => [...prev, newShortcut]);
        setShortcutName('');
        setKeyCombo('');
        setActionValue('');
    };
    
    return (
        <div>
             <form onSubmit={handleAddCustom} className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <h3 className="font-semibold mb-4 text-lg">Create a New Global Shortcut</h3>
                <div className="space-y-4">
                    <input type="text" value={shortcutName} onChange={e => setShortcutName(e.target.value)} placeholder="Shortcut Name (e.g., Open Project Folder)" className={`w-full p-2 text-sm rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
                    <input type="text" value={keyCombo} onChange={e => setKeyCombo(e.target.value)} placeholder="Key Combination (e.g., Ctrl + Alt + P)" className={`w-full p-2 text-sm rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
                    <div className="flex gap-4">
                         <select value={actionType} onChange={e => setActionType(e.target.value)} className={`p-2 text-sm rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                            <option value="url">Launch URL</option>
                            <option value="file">Open File/Program</option>
                            <option value="cmd">Run CMD Command</option>
                        </select>
                        <div className="relative flex-grow">
                             <input type="text" value={actionValue} onChange={e => setActionValue(e.target.value)} placeholder={actionType === 'url' ? 'https://google.com' : (actionType === 'file' ? 'C:\\path\\to\\program.exe' : 'ipconfig')} className={`w-full p-2 text-sm rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
                            {actionType === 'file' && <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-gray-500 text-white">Browse...</button>}
                        </div>
                    </div>
                    <button type="submit" className={`w-full p-2 rounded-md font-semibold text-sm ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>Add Shortcut</button>
                </div>
            </form>
             <h3 className="font-semibold mb-4 text-lg">Your Saved Shortcuts</h3>
            <div className="space-y-2">{customShortcuts.length > 0 ? customShortcuts.map(sc => (<div key={sc.id} className={`flex items-center justify-between p-3 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}><p className="text-sm font-medium">{sc.name}</p>{/* Add to toolbox etc. */ }</div>)) : <p className="text-sm text-gray-500">You haven't created any custom shortcuts yet.</p>}</div>
        </div>
    )
};


// --- Main Shortcut Showroom Application ---
export default function ShortcutShowroomApp() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [activeCategory, setActiveCategory] = useState(Object.keys(showroomData)[0]);
    const [isToolboxOpen, setIsToolboxOpen] = useState(false);
    const [copiedCmd, setCopiedCmd] = useState(null);
    const [toolboxItems, setToolboxItems] = useState(JSON.parse(localStorage.getItem('toolboxItems')) || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('toolboxItems', JSON.stringify(toolboxItems));
    }, [toolboxItems]);

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedCmd(text);
            setTimeout(() => setCopiedCmd(null), 1500);
        }).catch(err => console.error('Failed to copy: ', err));
    };

    const handleAddToToolbox = (item) => setToolboxItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
    
    const handleCategoryClick = (category) => setActiveCategory(category);

    const checkForUpdates = () => {
        alert("Checking for updates...\n\nYou are running the latest version of KeyCrate!");
    };
    
    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (!feedbackText.trim()) return;
        console.log("Feedback submitted:", feedbackText);
        alert("Thank you for your feedback!");
        setFeedbackText('');
    };

    const themeClasses = theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800';
    
    const renderContent = (data) => {
        if (!data) return null;
        if (data.type === 'home_dashboard') return <HomeDashboard theme={theme} setActiveCategory={setActiveCategory} />;
        if (data.type === 'release_notes') return <ReleaseNotes theme={theme} />;
        if (data.type === 'custom_creator') return <CustomCreator theme={theme} handleAddToToolbox={handleAddToToolbox} />;
        if (data.type === 'bible_view') return (<div><h2 className="text-2xl font-bold mb-2">{activeCategory}</h2>{data.description && <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{data.description}</p>}<a href="./shortcut_bible_ultimate.html" target="_blank" rel="noopener noreferrer" className={`w-full mt-6 p-3 rounded-md flex items-center justify-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}><BookOpen size={16}/> View Full Shortcut Bible (New Tab)</a></div>);
        const renderList = (items) => (<div className="space-y-2">{items.map((item, i) => { const id = item.description; const isAdded = toolboxItems.some(tbItem => tbItem.id === id); return (<div key={i} className={`flex items-center justify-between p-3 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}><p className="text-sm font-medium">{item.description}</p><div className="ml-4 flex items-center gap-4"><div>{item.keys.map((key, k_idx) => <Key key={k_idx} theme={theme}>{key}</Key>)}</div><button onClick={() => handleAddToToolbox({ id, type: 'shortcut', content: item })} title={isAdded ? "In Toolbox" : "Add to Toolbox"}>{isAdded ? <Check size={16} className="text-green-500" /> : <PlusSquare size={16} className="text-gray-500 hover:text-gray-300"/>}</button></div></div>);})}</div>);
        const renderTable = (section) => (<div>{section.subheading && <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{section.subheading}</h3>}<div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}><table className="w-full text-sm"><thead className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200'}`}><tr>{section.headers.map(h => <th key={h} className="p-3 text-left font-semibold">{h}</th>)}</tr></thead><tbody>{section.items.map((item, i) => { const id = item.col1; const isAdded = toolboxItems.some(tbItem => tbItem.id === id); return (<tr key={i} className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-t`}><td className="p-3 font-mono text-xs w-2/5"><div className="flex items-center gap-2">{item.warning && <AlertTriangle size={14} className="text-yellow-500 flex-shrink-0" title="Use with caution"/>}<span>{item.col1}</span><button onClick={() => handleCopyToClipboard(item.col1)} title="Copy command">{copiedCmd === item.col1 ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-500 hover:text-gray-300"/>}</button></div></td><td className="p-3">{item.col2}</td><td className="p-3 text-right"><button onClick={() => handleAddToToolbox({ id, type: 'command', content: { command: item.col1, description: item.col2 }})} title={isAdded ? "In Toolbox" : "Add to Toolbox"}>{isAdded ? <Check size={16} className="text-green-500" /> : <PlusSquare size={16} className="text-gray-500 hover:text-gray-300"/>}</button></td></tr>)})}</tbody></table></div></div>);
        
        return (
            <div>
                <h2 className="text-2xl font-bold mb-2">{activeCategory}</h2>
                {data.description && <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{data.description}</p>}
                {data.example && <WorkflowExample theme={theme} example={data.example} />}
                
                {data.type === 'list' && renderList(data.items)}
                {data.type === 'table' && renderTable({ items: data.items, headers: [...data.headers, ''] })}
                {data.type === 'mixed_content' && (<div className="space-y-6">{data.sections.map((section, i) => <div key={i}>{renderTable({ ...section, headers: [...section.headers, ''] })}</div>)}</div>)}
            </div>
        );
    };
    
    const deepSearch = (data, term) => {
        if (data.description?.toLowerCase().includes(term)) return true;
        if (data.items) {
            return data.items.some(item => 
                (item.description?.toLowerCase().includes(term)) ||
                (item.col1?.toLowerCase().includes(term)) ||
                (item.col2?.toLowerCase().includes(term))
            );
        }
        if (data.sections) {
            return data.sections.some(sec => sec.items.some(item => 
                (item.col1?.toLowerCase().includes(term)) ||
                (item.col2?.toLowerCase().includes(term))
            ));
        }
        return false;
    };

    const filteredData = Object.entries(showroomData).filter(([key, val]) => {
        if (!searchTerm) return true;
        const lowerTerm = searchTerm.toLowerCase();
        if (key.toLowerCase().includes(lowerTerm)) return true;
        return deepSearch(val, lowerTerm);
    });

    const renderSearchResults = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h2>
            {filteredData.length === 0 ? (
                <p className="text-gray-500">No results found.</p>
            ) : (
                filteredData.map(([category, data]) => (
                    <div key={category} className="mb-8">
                        <h3 className="text-xl font-semibold mb-3 border-b pb-2">{category}</h3>
                        {renderContent(data)}
                    </div>
                ))
            )}
        </div>
    );
    
    if (isMinimized) { return (<div className={`fixed bottom-0 left-1/2 -translate-x-1/2`}><button onClick={() => setIsMinimized(false)} className={`px-6 py-2 rounded-t-lg font-semibold text-sm flex items-center gap-2 transition-colors shadow-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-100 text-black'}`}><ListChecks size={16} /> KeyCrate</button></div>) }

    return (
        <div className={`flex items-center justify-center h-screen font-sans ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`}>
            {isToolboxOpen && <ProductivityToolboxApp theme={theme} onClose={() => setIsToolboxOpen(false)} toolboxItems={toolboxItems} setToolboxItems={setToolboxItems} handleCopyToClipboard={handleCopyToClipboard} copiedCmd={copiedCmd} />}
            {showAboutModal && (<Modal theme={theme} onClose={() => setShowAboutModal(false)}><div className="flex flex-col items-center text-center"><ListChecks size={48} className="text-blue-500"/><h2 className="text-2xl font-bold mt-4">KeyCrate</h2><p className="text-sm text-gray-500">Version 1.0 (MVP)</p><p className="mt-4">Your ultimate reference for shortcuts, commands, and developer tools.</p><button onClick={() => setShowAboutModal(false)} className={`mt-6 px-4 py-2 rounded-md font-semibold text-sm ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>Close</button></div></Modal>)}
            <div className={`rounded-xl shadow-2xl flex flex-col border overflow-hidden ${themeClasses} ${isMaximized ? 'w-screen h-screen rounded-none' : 'w-[95vw] max-w-[1200px] h-[90vh]'}`}>
                <MenuBar theme={theme} setTheme={setTheme} setIsToolboxOpen={setIsToolboxOpen} setToolboxItems={setToolboxItems} setActiveCategory={setActiveCategory} setShowAboutModal={setShowAboutModal} checkForUpdates={checkForUpdates} />
                <div className="flex flex-1 overflow-hidden">
                    <nav className={`w-64 p-4 border-r flex-col ${isMaximized ? 'flex' : 'hidden md:flex'} ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
                        <div className="mb-6 flex items-center gap-3">
                            <ListChecks size={32} className="text-blue-500"/>
                            <div><h1 className="text-2xl font-bold">KeyCrate</h1><p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>The Ultimate Reference</p></div>
                        </div>
                        <ul className="space-y-1 overflow-y-auto flex-grow">{Object.entries(showroomData).map(([category, data]) => (<li key={category}><button onClick={() => handleCategoryClick(category)} className={`w-full text-left text-sm font-medium p-2 rounded-md flex items-center gap-3 transition-colors ${activeCategory === category ? (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200')}`}>{data.icon} {category}</button></li>))}</ul>
                         <div className="mt-auto pt-4 border-t border-gray-700 space-y-4">
                            <form onSubmit={handleFeedbackSubmit}>
                                <label className="text-xs font-semibold mb-2 flex items-center gap-2"><MessageSquare size={14}/><span>Contribute / Suggest</span></label>
                                <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Suggest a shortcut or command..." rows="3" className={`w-full p-2 text-xs rounded-md border resize-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}></textarea>
                                <button type="submit" className={`mt-2 w-full px-2 py-1.5 rounded-md font-semibold text-xs flex items-center justify-center gap-2 transition-colors ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}><Send size={12} /> Submit</button>
                            </form>
                        </div>
                    </nav>
                    <main className="flex-1 flex flex-col">
                        <div className={`p-4 border-b flex justify-between items-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="relative w-full max-w-md">
                                <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                <input type="text" placeholder="Search all shortcuts and commands..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-2 text-sm rounded-md border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`} />
                            </div>
                            <div className="flex items-center gap-4 ml-4">
                                <button onClick={() => setIsToolboxOpen(true)} className={`px-4 py-2 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}><Wrench size={16} /> Launch Toolbox</button>
                                <div className="flex items-center gap-1">
                                    <TooltipButton onClick={() => setIsMinimized(true)} title="Minimize"><Minimize size={16} className="text-gray-500 hover:text-gray-300" /></TooltipButton>
                                    <TooltipButton onClick={() => setIsMaximized(!isMaximized)} title={isMaximized ? "Restore" : "Maximize"}><Maximize size={16} className="text-gray-500 hover:text-gray-300" /></TooltipButton>
                                    <TooltipButton onClick={() => {}} title="Close (Desktop app function)"><X size={16} className="text-gray-500 hover:text-red-500" /></TooltipButton>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow p-6 overflow-y-auto">
                           {searchTerm ? renderSearchResults() : renderContent(showroomData[activeCategory])}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}