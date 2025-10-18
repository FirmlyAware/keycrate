// src/components/HomeDashboard.jsx
import { useState, useEffect } from 'react';
import { Bell, Newspaper, Megaphone, BookOpen, PlusSquare, Code, LifeBuoy } from 'lucide-react';

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

export default HomeDashboard;