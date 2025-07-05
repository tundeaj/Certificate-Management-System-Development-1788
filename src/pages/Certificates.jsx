import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const { FiEye, FiDownload, FiMail, FiSearch, FiFilter, FiAward } = FiIcons;

function Certificates() {
  const { state } = useCertificate();
  const { certificates, events, attendees } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCertificates = certificates.filter(cert => {
    const attendee = attendees.find(a => a.id === cert.attendeeId);
    const event = events.find(e => e.id === cert.eventId);
    
    const matchesSearch = !searchTerm || 
      (attendee?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event?.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDownload = (certificate) => {
    // This would generate and download the PDF
    toast.success('Certificate downloaded successfully');
  };

  const handleResend = (certificate) => {
    // This would resend the certificate via email
    toast.success('Certificate resent successfully');
  };

  const getAttendee = (attendeeId) => {
    return attendees.find(a => a.id === attendeeId);
  };

  const getEvent = (eventId) => {
    return events.find(e => e.id === eventId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Issued Certificates</h2>
          <p className="text-gray-600 mt-1">
            View and manage all issued certificates
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
            />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="issued">Issued</option>
            <option value="sent">Sent</option>
            <option value="downloaded">Downloaded</option>
          </select>
        </div>
      </div>

      {/* Certificates List */}
      {filteredCertificates.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Certificate ID
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Attendee
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Issued Date
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCertificates.map((certificate, index) => {
                  const attendee = getAttendee(certificate.attendeeId);
                  const event = getEvent(certificate.eventId);
                  
                  return (
                    <motion.tr
                      key={certificate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-mono text-sm text-blue-600">
                          {certificate.certificateId}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">
                            {attendee?.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {attendee?.email || 'No email'}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">
                          {event?.title || 'Unknown Event'}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {format(new Date(certificate.issuedAt), 'MMM d, yyyy')}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          certificate.status === 'issued' 
                            ? 'bg-green-100 text-green-800'
                            : certificate.status === 'sent'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {certificate.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/certificates/${certificate.id}`}
                            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                            title="View"
                          >
                            <SafeIcon icon={FiEye} className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDownload(certificate)}
                            className="p-2 text-green-600 hover:text-green-800 transition-colors"
                            title="Download"
                          >
                            <SafeIcon icon={FiDownload} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleResend(certificate)}
                            className="p-2 text-purple-600 hover:text-purple-800 transition-colors"
                            title="Resend Email"
                          >
                            <SafeIcon icon={FiMail} className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiAward} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== 'all' ? 'No certificates found' : 'No certificates issued yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Generate certificates from your events to see them here'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Link
              to="/events"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
            >
              <SafeIcon icon={FiAward} className="w-5 h-5" />
              <span>Go to Events</span>
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Certificates;