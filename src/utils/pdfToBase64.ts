import fs from "fs";

/**
 * Lee un archivo PDF y lo convierte a base64.
 * @param filePath Ruta del archivo PDF.
 * @return Una promesa que se resuelve con el contenido del PDF en base64.
 */
async function pdfToBase64(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    // Lee el archivo PDF
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // Convierte el contenido del PDF a base64
        const base64Data = Buffer.from(data).toString("base64");
        resolve(base64Data);
      }
    });
  });
}

export { pdfToBase64 };
