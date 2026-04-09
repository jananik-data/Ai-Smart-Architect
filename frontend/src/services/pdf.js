/**
 * PDF Generation Service
 * Handles PDF creation and download
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Download results as PDF
 * @param {string} elementId - ID of the HTML element to convert
 * @param {string} filename - Name of the PDF file
 */
export const downloadResultsAsPDF = async (elementId, filename = 'design-plan.pdf') => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error('Element not found');
    }

    // Show loading state
    const originalText = document.body.style.cursor;
    document.body.style.cursor = 'wait';

    // Convert HTML to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    // Get canvas dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF with pagination
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save PDF
    pdf.save(filename);
    
    // Restore cursor
    document.body.style.cursor = originalText;

    return true;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    document.body.style.cursor = 'auto';
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};
