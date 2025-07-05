import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';
import toast from 'react-hot-toast';

const { FiSave, FiArrowLeft, FiEye, FiType, FiImage, FiSquare, FiGrid } = FiIcons;

function TemplateEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, saveTemplate } = useCertificate();
  const { templates, signingAuthorities } = state;
  
  const [template, setTemplate] = useState({
    name: '',
    description: '',
    size: 'A4',
    orientation: 'landscape',
    backgroundColor: '#ffffff',
    backgroundImage: '',
    elements: [],
    customFields: {}
  });

  const [selectedTool, setSelectedTool] = useState('text');
  const [selectedElement, setSelectedElement] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (id) {
      const existingTemplate = templates.find(t => t.id === id);
      if (existingTemplate) {
        setTemplate(existingTemplate);
      }
    }
  }, [id, templates]);

  const handleSave = () => {
    if (!template.name.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    try {
      saveTemplate(template);
      toast.success('Template saved successfully');
      navigate('/templates');
    } catch (error) {
      toast.error('Failed to save template');
    }
  };

  const tools = [
    { id: 'text', name: 'Text', icon: FiType },
    { id: 'image', name: 'Image', icon: FiImage },
    { id: 'shape', name: 'Shape', icon: FiSquare },
    { id: 'grid', name: 'Grid', icon: FiGrid },
  ];

  const mergeTags = [
    { tag: '[[AttendeeName]]', description: 'Full name of the attendee' },
    { tag: '[[CourseEventTitle]]', description: 'Title of the event' },
    { tag: '[[CompletionDate]]', description: 'Date of completion' },
    { tag: '[[SigningAuthorityName]]', description: 'Name of signing authority' },
    { tag: '[[SigningAuthorityTitle]]', description: 'Title of signing authority' },
    { tag: '[[CertificateID]]', description: 'Unique certificate identifier' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/templates')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {id ? 'Edit Template' : 'Create Template'}
                </h1>
                <p className="text-sm text-gray-500">
                  Design your certificate template
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>Save Template</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Panel - Properties */}
        <div className="w-80 bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Template Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Info</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={template.name}
                    onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={template.description}
                    onChange={(e) => setTemplate({ ...template, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size
                    </label>
                    <select
                      value={template.size}
                      onChange={(e) => setTemplate({ ...template, size: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="A4">A4</option>
                      <option value="Letter">Letter</option>
                      <option value="Legal">Legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Orientation
                    </label>
                    <select
                      value={template.orientation}
                      onChange={(e) => setTemplate({ ...template, orientation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="landscape">Landscape</option>
                      <option value="portrait">Portrait</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Tools */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTool === tool.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <SafeIcon icon={tool.icon} className="w-4 h-4" />
                    <span>{tool.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Merge Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Merge Tags</h3>
              <div className="space-y-2">
                {mergeTags.map((tag) => (
                  <div
                    key={tag.tag}
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      // Add tag to selected text element
                      toast.info(`Added ${tag.tag} to template`);
                    }}
                  >
                    <div className="font-mono text-sm text-blue-600 font-medium">
                      {tag.tag}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {tag.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Canvas */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Canvas */}
            <div
              className={`relative ${
                template.orientation === 'landscape' 
                  ? 'w-[800px] h-[600px]' 
                  : 'w-[600px] h-[800px]'
              }`}
              style={{ backgroundColor: template.backgroundColor }}
            >
              {/* Background Image */}
              {template.backgroundImage && (
                <img
                  src={template.backgroundImage}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Sample Certificate Content */}
              <div className="absolute inset-0 p-16 flex flex-col items-center justify-center text-center">
                <div className="border-4 border-blue-600 p-8 w-full h-full flex flex-col items-center justify-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Certificate of Completion
                  </h1>
                  <div className="text-lg text-gray-600 mb-6">
                    This is to certify that
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
                    [[AttendeeName]]
                  </div>
                  <div className="text-lg text-gray-600 mb-2">
                    has successfully completed
                  </div>
                  <div className="text-2xl font-semibold text-gray-800 mb-8">
                    [[CourseEventTitle]]
                  </div>
                  <div className="flex justify-between items-end w-full mt-auto">
                    <div className="text-center">
                      <div className="border-t border-gray-400 pt-2">
                        <div className="text-sm text-gray-600">Date</div>
                        <div className="font-medium">[[CompletionDate]]</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="border-t border-gray-400 pt-2">
                        <div className="font-medium">[[SigningAuthorityName]]</div>
                        <div className="text-sm text-gray-600">[[SigningAuthorityTitle]]</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid overlay when grid tool is selected */}
              {selectedTool === 'grid' && (
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Element Properties */}
        <div className="w-80 bg-white shadow-sm border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Element Properties
            </h3>
            
            {selectedElement ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Color
                  </label>
                  <input
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alignment
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Select an element to edit its properties</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateEditor;