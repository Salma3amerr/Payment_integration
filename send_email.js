const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Function to generate a PDF invoice
function generateInvoicePDF() {
    const doc = new PDFDocument();

    // Set the font and font size for the entire document
    doc.font('Helvetica');
    doc.fontSize(12);

    // Header section
    doc.text('Invoice', { align: 'center', fontSize: 24, bold: true });
    doc.moveDown(0.5);

    // Bill Details section
    doc.text('Bill Details:', { underline: true, bold: true });
    doc.moveDown(0.5);

    // Customize bill details here
    doc.text('Description: Donation');
    doc.text('Date: ' + new Date().toDateString());
    doc.text('Amount: $500');

    // Additional content
    doc.moveDown(1);
    doc.text('Thank You for Your Donation!', { bold: true });
    doc.text('Your generous donation is making a significant impact by providing shelter and support to homeless individuals in need. Your contribution helps save lives and gives hope to those less fortunate.');

    // Payment Details section
    doc.moveDown(1);
    doc.text('Payment Details:', { underline: true, bold: true });
    doc.moveDown(0.5);

    // Customize payment details here
    doc.text('Amount to be Paid: $500');
    doc.text('Email: Salma3amer75@gmail.com');

    // Save the PDF to a file
    doc.pipe(fs.createWriteStream('invoice.pdf'));
    doc.end();
}


// Function to send an email with the invoice attachment
async function sendEmailWithInvoice() {
    // Generate the invoice PDF
    generateInvoicePDF();

    // Create a transporter object with your email service configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'salmaamer082@gmail.com',
            pass: 'pdqaywavgslmeqzm',
        },
    });

    // Create an email message
    const mailOptions = {
        from: 'salmaamer082@gmail.com',
        to: 'Salma3amer75@gmail.com',
        subject: 'Invoice for Sparks Payment Integration Donation',
        text: 'Please find the invoice attached.',
        attachments: [
            {
                filename: 'invoice.pdf',
                path: 'invoice.pdf',
            },
        ],
    };

    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Email error:', error);
    }
}

// Call the function to send the email with the invoice attachment
sendEmailWithInvoice();
