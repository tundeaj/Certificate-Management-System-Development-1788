import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiHome, FiFileText, FiCalendar, FiAward, 
  FiSettings, FiShield, FiTrendingUp 
} = FiIcons;

const navigation = [
  { name: 'Dashboard', href: '/', icon: FiHome },
  { name: 'Templates', href: '/templates', icon: FiFileText },
  { name: 'Events', href: '/events', icon: FiCalendar },
  { name: 'Certificates', href: '/certificates', icon: FiAward },
  { name: 'Settings', href: '/settings', icon: FiSettings },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiAward} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CertifyPro</h1>
            <p className="text-sm text-gray-500">Certificate Management</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <SafeIcon 
                        icon={item.icon} 
                        className={`w-5 h-5 mr-3 ${
                          isActive ? 'text-blue-700' : 'text-gray-400'
                        }`} 
                      />
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="ml-auto w-2 h-2 bg-blue-700 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <SafeIcon icon={FiShield} className="w-4 h-4" />
          <span>Secure & Verified</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;