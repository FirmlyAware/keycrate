// src/components/TooltipButton.jsx
const TooltipButton = ({ onClick, title, children, className }) => (
  <button onClick={onClick} title={title} className={`p-1 rounded ${className}`}>
    {children}
  </button>
);

export default TooltipButton;