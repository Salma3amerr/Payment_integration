// Function to generate and save the invoice as PDF
async function generateAndSaveInvoice() {
    // Replace 'invoice.html' with the actual URL or content of your invoice
    const invoiceHTMLContent = await fetch('invoice.html').then(response => response.text());

    // Create a new blob from the HTML content
    const blob = new Blob([invoiceHTMLContent], { type: 'text/html' });

    // Create an object URL from the blob
    const objectURL = URL.createObjectURL(blob);

    // Create an anchor element for downloading
    const a = document.createElement('a');
    a.href = objectURL;
    a.download = 'invoice.pdf'; // Specify the file name

    // Trigger a click event on the anchor element to initiate download
    a.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(objectURL);
}
