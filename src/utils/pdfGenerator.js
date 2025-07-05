import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCertificatePDF = async (certificate, template) => {
  try {
    const pdf = new jsPDF({
      orientation: template.orientation || 'landscape',
      unit: 'mm',
      format: template.size || 'a4'
    });

    // Set background color
    if (template.backgroundColor) {
      pdf.setFillColor(template.backgroundColor);
      pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
    }

    // Add background image if exists
    if (template.backgroundImage) {
      try {
        pdf.addImage(
          template.backgroundImage,
          'JPEG',
          0,
          0,
          pdf.internal.pageSize.width,
          pdf.internal.pageSize.height
        );
      } catch (error) {
        console.warn('Could not add background image:', error);
      }
    }

    // Add border
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(2);
    pdf.rect(10, 10, pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 20);

    // Add title
    pdf.setFontSize(36);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Certificate of Completion', pdf.internal.pageSize.width / 2, 40, { align: 'center' });

    // Add subtitle
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('This is to certify that', pdf.internal.pageSize.width / 2, 60, { align: 'center' });

    // Add attendee name
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 100, 200);
    pdf.text(certificate.data.attendeeName, pdf.internal.pageSize.width / 2, 85, { align: 'center' });

    // Add completion text
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text('has successfully completed', pdf.internal.pageSize.width / 2, 105, { align: 'center' });

    // Add course title
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(certificate.data.courseEventTitle, pdf.internal.pageSize.width / 2, 125, { align: 'center' });

    // Add completion date
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Completion Date: ${certificate.data.completionDate}`, 30, 160);

    // Add certificate ID
    pdf.text(`Certificate ID: ${certificate.certificateId}`, 30, 175);

    // Add signing authority
    if (certificate.data.signingAuthorityName) {
      pdf.text(certificate.data.signingAuthorityName, pdf.internal.pageSize.width - 30, 160, { align: 'right' });
      pdf.text(certificate.data.signingAuthorityTitle, pdf.internal.pageSize.width - 30, 175, { align: 'right' });
    }

    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const downloadCertificatePDF = async (certificate, template) => {
  try {
    const pdf = await generateCertificatePDF(certificate, template);
    const fileName = `certificate-${certificate.certificateId}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};