// src/components/MenuBar.jsx
import { useState, useEffect, useRef } from 'react';

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

export default MenuBar;