import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCertificate } from '../context/CertificateContext';

const { FiShield, FiCheck, FiX, FiSearch } = FiIcons;

function Verification() {
  const { state } = useCertificate();
  const { certificates, events, attendees } = state;
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const certificate = certificates.find(c => c.certificateId === certificateId.trim());
      
      if (certificate) {
        const event = events.find(e => e.id === certificate.eventId);
        const attendee = attendees.find(a => a.id === certificate.attendeeId);
        
        setVerificationResult({
          valid: true,
          certificate,
          event,
          attendee
        });
      } else {
        setVerificationResult({
          valid: false,
          message: 'Certificate not found or invalid'
        });
      }
      
      setIsVerifying(false);
    }, 1500);
  };

  const handleReset = () => {
    setCertificateId('');
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiShield} className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Certificate Verification</h2>
          <p className="mt-2 text-gray-600">
            Enter a certificate ID to verify its authenticity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          {!verificationResult ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate ID
                </label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Enter certificate ID (e.g., CERT-1234567890)"
                  onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                />
              </div>
              
              <button
                onClick={handleVerify}
                disabled={!certificateId.trim() || isVerifying}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSearch} className="w-4 h-4" />
                    <span>Verify Certificate</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {verificationResult.valid ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Certificate Verified
                  </h3>
                  <p className="text-gray-600 mb-6">
                    This certificate is valid and authentic
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-left space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Attendee:</span>
                      <div className="text-gray-900">{verificationResult.attendee?.name}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Event:</span>
                      <div className="text-gray-900">{verificationResult.event?.title}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Completion Date:</span>
                      <div className="text-gray-900">{verificationResult.certificate.data.completionDate}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Issued Date:</span>
                      <div className="text-gray-900">
                        {new Date(verificationResult.certificate.issuedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Signing Authority:</span>
                      <div className="text-gray-900">
                        {verificationResult.certificate.data.signingAuthorityName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {verificationResult.certificate.data.signingAuthorityTitle}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={FiX} className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Certificate Not Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {verificationResult.message || 'The certificate ID you entered is not valid'}
                  </p>
                </motion.div>
              )}
              
              <button
                onClick={handleReset}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Verify Another Certificate
              </button>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm text-gray-500"
        >
          <p>
            This verification system ensures the authenticity of certificates issued by our platform.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Verification;