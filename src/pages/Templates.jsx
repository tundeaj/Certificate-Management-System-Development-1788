import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const { FiPlus, FiEdit, FiTrash2, FiCopy, FiEye, FiFileText } = FiIcons;

function Templates() {
  const { state, deleteTemplate } = useCertificate();
  const { templates } = state;
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteTemplate(id);
    setDeleteConfirm(null);
    toast.success('Template deleted successfully');
  };

  const handleDuplicate = (template) => {
    // This would create a copy of the template
    toast.success('Template duplicated successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Certificate Templates</h2>
          <p className="text-gray-600 mt-1">
            Create and manage reusable certificate templates
          </p>
        </div>
        <Link
          to="/templates/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>New Template</span>
        </Link>
      </div>

      {/* Templates Grid */}
      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Template Preview */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center border-b border-gray-200">
                <div className="w-32 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <SafeIcon icon={FiFileText} className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {template.description || 'No description provided'}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Created {format(new Date(template.createdAt), 'MMM d, yyyy')}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {template.size || 'A4'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/templates/${template.id}/edit`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDuplicate(template)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Duplicate"
                  >
                    <SafeIcon icon={FiCopy} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(template.id)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiFileText} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first certificate template to get started
          </p>
          <Link
            to="/templates/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Create Template</span>
          </Link>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Template
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this template? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Templates;