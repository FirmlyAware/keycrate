// src/components/WorkflowExample.jsx
import { ChevronsRight } from 'lucide-react';

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

export default WorkflowExample;