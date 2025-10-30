import React from 'react';

const NODE_TYPES = {
  object: { color: 'purple', label: 'Object' },
  array: { color: 'green', label: 'Array' },
  primitive: { color: 'orange', label: 'Primitive' },
};

export default function PopupIndex() {
  return (
    <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
      <h3 className="font-semibold text-sm mb-2 text-gray-700">Legend:</h3>
      <div className="space-y-2">
        {Object.entries(NODE_TYPES).map(([type, { color, label }]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ background: color }}
            />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
