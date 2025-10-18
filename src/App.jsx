// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Search, Wrench, ListChecks, MessageSquare, Send, AlertTriangle, Check, Copy, PlusSquare, BookOpen, X, Minimize, Maximize } from 'lucide-react';

import showroomData from './data/showroomData';
import Key from './components/Key';
import TooltipButton from './components/TooltipButton';
import WorkflowExample from './components/WorkflowExample';
import Modal from './components/Modal';
import MenuBar from './components/MenuBar';
import ProductivityToolboxApp from './components/ProductivityToolboxApp';
import HomeDashboard from './components/HomeDashboard';
import ReleaseNotes from './components/ReleaseNotes';
import CustomCreator from './components/CustomCreator';

const App = () => {
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
};

export default App;