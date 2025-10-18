// src/components/Key.jsx
const Key = ({ children, theme }) => (
  <kbd className={`px-2 py-1 text-xs font-semibold rounded mx-0.5 ${theme === 'dark' ? 'bg-gray-600 text-gray-100 border-b-2 border-gray-500' : 'bg-gray-300 text-gray-800 border-b-2 border-gray-400'}`}>
    {children}
  </kbd>
);

export default Key;