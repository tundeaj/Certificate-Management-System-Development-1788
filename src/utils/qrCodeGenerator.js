import QRCode from 'qrcode';

export const generateQRCode = async (certificateId, verificationUrl) => {
  try {
    const qrData = `${verificationUrl}?id=${certificateId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

export const generateQRCodeForCertificate = async (certificate) => {
  const verificationUrl = `${window.location.origin}/verify`;
  return await generateQRCode(certificate.certificateId, verificationUrl);
};