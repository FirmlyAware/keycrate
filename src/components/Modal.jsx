// src/components/Modal.jsx
const Modal = ({ theme, onClose, children }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
    <div className={`rounded-lg shadow-2xl p-6 w-full max-w-md border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

export default Modal;