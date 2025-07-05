import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';

const { 
  FiFileText, FiCalendar, FiAward, FiUsers, 
  FiTrendingUp, FiPlus, FiEye, FiDownload 
} = FiIcons;

function Dashboard() {
  const { state } = useCertificate();
  const { templates, events, certificates, attendees } = state;

  const stats = [
    {
      name: 'Total Templates',
      value: templates.length,
      icon: FiFileText,
      color: 'bg-blue-500',
      href: '/templates'
    },
    {
      name: 'Active Events',
      value: events.length,
      icon: FiCalendar,
      color: 'bg-green-500',
      href: '/events'
    },
    {
      name: 'Certificates Issued',
      value: certificates.length,
      icon: FiAward,
      color: 'bg-purple-500',
      href: '/certificates'
    },
    {
      name: 'Total Attendees',
      value: attendees.length,
      icon: FiUsers,
      color: 'bg-orange-500',
      href: '/attendees'
    },
  ];

  const quickActions = [
    {
      name: 'Create Template',
      description: 'Design a new certificate template',
      icon: FiFileText,
      href: '/templates/new',
      color: 'bg-blue-500'
    },
    {
      name: 'Add Event',
      description: 'Create a new webinar or course',
      icon: FiCalendar,
      href: '/events/new',
      color: 'bg-green-500'
    },
    {
      name: 'View Certificates',
      description: 'Browse issued certificates',
      icon: FiAward,
      href: '/certificates',
      color: 'bg-purple-500'
    },
  ];

  const recentCertificates = certificates.slice(-5).reverse();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to CertifyPro</h2>
            <p className="text-blue-100 text-lg">
              Manage your digital certificates with ease and professionalism
            </p>
          </div>
          <div className="hidden lg:block">
            <SafeIcon icon={FiTrendingUp} className="w-16 h-16 text-blue-200" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={stat.href}
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.name}
              to={action.href}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <SafeIcon icon={action.icon} className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{action.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Certificates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Certificates</h3>
          <Link
            to="/certificates"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all
          </Link>
        </div>
        
        {recentCertificates.length > 0 ? (
          <div className="space-y-4">
            {recentCertificates.map((certificate) => (
              <div
                key={certificate.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiAward} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {certificate.data.attendeeName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {certificate.data.courseEventTitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {new Date(certificate.issuedAt).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/certificates/${certificate.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <SafeIcon icon={FiAward} className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No certificates issued yet</p>
            <Link
              to="/events"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
            >
              Create your first event
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;