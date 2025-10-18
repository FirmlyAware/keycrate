// src/components/ProductivityToolboxApp.jsx
import { useState, useEffect, useRef } from 'react';
import { Settings, X, Download, Check, Copy } from 'lucide-react';
import TooltipButton from './TooltipButton';

const ProductivityToolboxApp = ({ theme, onClose, toolboxItems, setToolboxItems, handleCopyToClipboard, copiedCmd }) => {
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

export default ProductivityToolboxApp;