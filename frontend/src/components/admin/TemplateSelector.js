import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { electionTemplates } from '../../utils/electionTemplates';

const TemplateSelector = ({ onSelectTemplate, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleConfirm = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Choose an Election Template
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select a template to quickly set up your election with pre-configured settings
          </p>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {electionTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelect(template)}
                className={`relative p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedTemplate?.id === template.id
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 bg-white dark:bg-gray-900'
                }`}
              >
                {/* Selection Indicator */}
                {selectedTemplate?.id === template.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className="text-4xl mb-3">{template.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {template.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>

                {/* Details */}
                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                  <div className="flex items-center justify-between">
                    <span>Type:</span>
                    <span className="font-medium capitalize">{template.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{template.settings.suggestedDuration} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Min Candidates:</span>
                    <span className="font-medium">{template.settings.minCandidates}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedTemplate}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Use This Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
