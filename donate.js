const PDFDocument = require('pdfkit');
const fs = require('fs');
const { sendEmailWithInvoice } = require('./send_email');

// Reference the "PAY NOW" button
const payNowButton = document.getElementById("payNow");

// Function to generate a PDF invoice
function generateInvoicePDF(data) {
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

    // Customize bill details here based on the data
    doc.text(`Description: ${data.description}`);
    doc.text(`Date: ${data.date}`);
    doc.text(`Amount: $${data.amount}`);

    // Save the PDF to a file
    doc.pipe(fs.createWriteStream('invoice.pdf'));
    doc.end();
}

// Function to send an email with the invoice attachment
async function sendEmailWithInvoice(firstName, lastName, userEmail, amount) {
    // Generate the invoice data
    const invoiceData = {
        description: 'Donation Invoice',
        date: new Date().toDateString(),
        amount: amount,
    };

    // Generate the invoice PDF
    generateInvoicePDF(invoiceData);

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
        to: userEmail,
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

// Inside the "PAY NOW" button event listener
payNowButton.addEventListener("click", async function (e) {
    e.preventDefault();
    console.log("PAY NOW button clicked");
    
    const paymentStatus = "success"; // Replace with your actual payment status
    
    if (paymentStatus === "success") {
        const firstName = document.querySelector("input[name='full_name']").value;
        const lastName = document.querySelector("input[name='nickname']").value;
        const userEmail = document.querySelector("input[name='user_email']").value;
        const amount = document.querySelector("input[name='amount_to_pay']").value;

        // Send the invoice via email
        sendEmailWithInvoice(firstName, lastName, userEmail, amount);
        alert("Invoice sent successfully!");
    } else {
        // Handle payment failure here
        alert("Payment failed. Please try again or contact support.");
    }
});
