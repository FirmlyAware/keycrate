// src/components/CustomCreator.jsx
import { useState, useEffect } from 'react';

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
  );
};

export default CustomCreator;