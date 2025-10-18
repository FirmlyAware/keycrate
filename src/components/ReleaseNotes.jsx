// src/components/ReleaseNotes.jsx
const ReleaseNotes = ({ theme }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">What's New in KeyCrate</h2>
    <div className="space-y-6">
      <div><h3 className="text-xl font-semibold text-green-500">Version 1.1 (Major Update)</h3><p className="text-sm text-gray-500 mb-2">Released: October 17, 2025</p><ul className="list-disc list-inside space-y-1 text-sm"><li>**New Feature:** Interactive Workflow Sandbox for guided learning.</li><li>**New Feature:** Added comprehensive "Shortcut Bible" master list.</li><li>**Improvement:** Overhauled UI for better readability.</li></ul></div>
      <div><h3 className="text-xl font-semibold text-blue-500">Version 1.0.1 (Standard Update)</h3><p className="text-sm text-gray-500 mb-2">Released: September 17, 2025</p><ul className="list-disc list-inside space-y-1 text-sm"><li>Added "Windows Tools" section.</li><li>Expanded "Networking Commands" with more utilities.</li><li>Improved search functionality.</li></ul></div>
      <div><h3 className="text-xl font-semibold text-yellow-500">Version 1.0.0 (Initial Release)</h3><p className="text-sm text-gray-500 mb-2">Released: August 17, 2025</p><ul className="list-disc list-inside space-y-1 text-sm"><li>Initial public release of KeyCrate.</li><li>Core features: Toolbox, Custom Shortcuts, Theming.</li></ul></div>
    </div>
  </div>
);

export default ReleaseNotes;