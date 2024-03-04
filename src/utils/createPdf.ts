import fs from "fs";
import PDFDocument from "pdfkit";

async function createPDF(data: any, filePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF content to a writable stream
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add content to the PDF
    doc.fontSize(12).text(JSON.stringify(data, null, 2));

    // End the document
    doc.end();

    // Handle errors and resolve when the PDF is created successfully
    stream.on("finish", () => {
      resolve();
    });

    stream.on("error", (error) => {
      console.error("Error creating PDF:", error);
      reject(error);
    });
  });
}

export { createPDF };
