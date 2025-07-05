import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBell, FiUser, FiSearch } = FiIcons;

const pageNames = {
  '/': 'Dashboard',
  '/templates': 'Certificate Templates',
  '/events': 'Events & Webinars',
  '/certificates': 'Issued Certificates',
  '/settings': 'Settings',
};

function Header() {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || 'Certificate Management';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <motion.h1 
              key={pageName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-gray-900"
            >
              {pageName}
            </motion.h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your digital certificates with ease
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <SafeIcon 
                icon={FiSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
              />
              <input
                type="text"
                placeholder="Search certificates..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <SafeIcon icon={FiBell} className="w-5 h-5" />
            </button>
            
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;