import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';
import toast from 'react-hot-toast';

const { FiUser, FiMail, FiSave, FiPlus, FiTrash2, FiUpload } = FiIcons;

function Settings() {
  const { state, addSigningAuthority } = useCertificate();
  const { signingAuthorities } = state;
  
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: 'Certificate System'
  });

  const [newAuthority, setNewAuthority] = useState({
    name: '',
    title: '',
    signature: null
  });

  const [showAddAuthority, setShowAddAuthority] = useState(false);

  const handleSaveEmailSettings = () => {
    // This would save email settings to localStorage or backend
    toast.success('Email settings saved successfully');
  };

  const handleAddAuthority = () => {
    if (!newAuthority.name.trim() || !newAuthority.title.trim()) {
      toast.error('Please enter authority name and title');
      return;
    }

    addSigningAuthority(newAuthority);
    setNewAuthority({ name: '', title: '', signature: null });
    setShowAddAuthority(false);
    toast.success('Signing authority added successfully');
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewAuthority({ ...newAuthority, signature: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Email Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center space-x-3 mb-6">
          <SafeIcon icon={FiMail} className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Email Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host
            </label>
            <input
              type="text"
              value={emailSettings.smtpHost}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="smtp.gmail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Port
            </label>
            <input
              type="text"
              value={emailSettings.smtpPort}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="587"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Username
            </label>
            <input
              type="text"
              value={emailSettings.smtpUser}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your-email@gmail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Password
            </label>
            <input
              type="password"
              value={emailSettings.smtpPassword}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your app password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Email
            </label>
            <input
              type="email"
              value={emailSettings.fromEmail}
              onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="certificates@yourcompany.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Name
            </label>
            <input
              type="text"
              value={emailSettings.fromName}
              onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Certificate System"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleSaveEmailSettings}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save Email Settings</span>
          </button>
        </div>
      </motion.div>

      {/* Signing Authorities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiUser} className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Signing Authorities</h3>
          </div>
          <button
            onClick={() => setShowAddAuthority(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Authority</span>
          </button>
        </div>
        
        {signingAuthorities.length > 0 ? (
          <div className="space-y-4">
            {signingAuthorities.map((authority) => (
              <div
                key={authority.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{authority.name}</h4>
                    <p className="text-sm text-gray-500">{authority.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {authority.signature && (
                    <div className="text-sm text-green-600">Signature uploaded</div>
                  )}
                  <button
                    onClick={() => {
                      // This would delete the authority
                      toast.success('Authority deleted successfully');
                    }}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <SafeIcon icon={FiUser} className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No signing authorities added yet</p>
          </div>
        )}
      </motion.div>

      {/* Add Authority Modal */}
      {showAddAuthority && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Signing Authority
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newAuthority.name}
                  onChange={(e) => setNewAuthority({ ...newAuthority, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newAuthority.title}
                  onChange={(e) => setNewAuthority({ ...newAuthority, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Director of Education"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signature (Optional)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    className="hidden"
                    id="signature-upload"
                  />
                  <label
                    htmlFor="signature-upload"
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <SafeIcon icon={FiUpload} className="w-4 h-4" />
                    <span>Upload Signature</span>
                  </label>
                  {newAuthority.signature && (
                    <span className="text-sm text-green-600">Signature uploaded</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddAuthority(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAuthority}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Authority
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Settings;