import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const { FiArrowLeft, FiDownload, FiMail, FiExternalLink, FiAward } = FiIcons;

function CertificateViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useCertificate();
  const { certificates, events, attendees, templates } = state;

  const certificate = certificates.find(c => c.id === id);
  const event = certificate ? events.find(e => e.id === certificate.eventId) : null;
  const attendee = certificate ? attendees.find(a => a.id === certificate.attendeeId) : null;
  const template = certificate ? templates.find(t => t.id === certificate.templateId) : null;

  if (!certificate) {
    return (
      <div className="text-center py-12">
        <SafeIcon icon={FiAward} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Certificate not found</h3>
        <p className="text-gray-600 mb-6">
          The certificate you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/certificates')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          <span>Back to Certificates</span>
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    // This would generate and download the PDF
    toast.success('Certificate downloaded successfully');
  };

  const handleResend = () => {
    // This would resend the certificate via email
    toast.success('Certificate resent successfully');
  };

  const handleVerify = () => {
    // This would open the public verification page
    window.open(`/verify?id=${certificate.certificateId}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/certificates')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Certificate Details</h2>
            <p className="text-gray-600 mt-1">
              View and manage certificate information
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleVerify}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
            <span>Verify</span>
          </button>
          <button
            onClick={handleResend}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiMail} className="w-4 h-4" />
            <span>Resend</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Certificate Preview */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Certificate Preview</h3>
            
            {/* Certificate Canvas */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl">
                <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                  <div className="border-4 border-blue-600 h-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-3">
                      Certificate of Completion
                    </h1>
                    <div className="text-sm text-gray-600 mb-4">
                      This is to certify that
                    </div>
                    <div className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
                      {certificate.data.attendeeName}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      has successfully completed
                    </div>
                    <div className="text-lg font-semibold text-gray-800 mb-6">
                      {certificate.data.courseEventTitle}
                    </div>
                    <div className="flex justify-between items-end w-full mt-auto">
                      <div className="text-center">
                        <div className="border-t border-gray-400 pt-2">
                          <div className="text-xs text-gray-600">Date</div>
                          <div className="text-sm font-medium">{certificate.data.completionDate}</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="border-t border-gray-400 pt-2">
                          <div className="text-sm font-medium">{certificate.data.signingAuthorityName}</div>
                          <div className="text-xs text-gray-600">{certificate.data.signingAuthorityTitle}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certificate Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Certificate ID
                </label>
                <div className="font-mono text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                  {certificate.certificateId}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Attendee Name
                </label>
                <div className="text-gray-900">{attendee?.name || 'Unknown'}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <div className="text-gray-900">{attendee?.email || 'No email'}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Event Title
                </label>
                <div className="text-gray-900">{event?.title || 'Unknown Event'}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Issued Date
                </label>
                <div className="text-gray-900">
                  {format(new Date(certificate.issuedAt), 'MMMM d, yyyy')}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Status
                </label>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  certificate.status === 'issued' 
                    ? 'bg-green-100 text-green-800'
                    : certificate.status === 'sent'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {certificate.status}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Template Name
                </label>
                <div className="text-gray-900">{template?.name || 'Unknown Template'}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Template Size
                </label>
                <div className="text-gray-900">{template?.size || 'A4'}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Orientation
                </label>
                <div className="text-gray-900 capitalize">{template?.orientation || 'landscape'}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CertificateViewer;