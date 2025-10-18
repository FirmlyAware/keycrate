// src/data/showroomData.js
import { Home, BookOpen, Monitor, FileText, LifeBuoy, Network, Wrench, TerminalSquare, Code, Package, Sparkles, Info, PlusSquare } from 'lucide-react';

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

export default showroomData;