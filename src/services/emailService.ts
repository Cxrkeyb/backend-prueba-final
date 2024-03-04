import AWS from "../config/awsConfig";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

interface EmailDataHtml {
  toAddresses: string[]; // Correos electrónicos de los destinatarios
  subject: string; // Asunto del correo electrónico
  source: string; // Dirección de correo electrónico del remitente
}

interface EmailData {
  toAddresses: string[]; // Correos electrónicos de los destinatarios
  subject: string; // Asunto del correo electrónico
  message: string; // Cuerpo del mensaje del correo electrónico
  source: string; // Dirección de correo electrónico del remitente
}

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const transporter = nodemailer.createTransport({
  SES: { ses, aws: AWS }
});

async function sendEmail(data: EmailData): Promise<void> {
  const params = {
    Destination: { ToAddresses: data.toAddresses },
    Message: {
      Body: { Text: { Data: data.message } },
      Subject: { Data: data.subject }
    },
    Source: data.source
  };

  try {
    const result = await ses.sendEmail(params).promise();
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
}

async function sendEmailWithHTMLFile(
  data: EmailDataHtml,
  htmlFilePath: string,
  replacements: Record<string, string>
): Promise<void> {
  try {
    // Leer el contenido del archivo HTML
    let htmlContent = fs.readFileSync(htmlFilePath, { encoding: "utf-8" });

    // Reemplazar los marcadores de posición en el contenido HTML
    Object.keys(replacements).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      htmlContent = htmlContent.replace(regex, replacements[key]);
    });

    // Crear el objeto de parámetros para el envío del correo electrónico
    const params = {
      Destination: { ToAddresses: data.toAddresses },
      Message: {
        Body: { Html: { Data: htmlContent } },
        Subject: { Data: data.subject }
      },
      Source: data.source
    };

    // Crear una nueva instancia de SES y enviar el correo electrónico
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    await ses.sendEmail(params).promise();
  } catch (error) {
    throw error;
  }
}

/**
 * Función para enviar un correo electrónico con un archivo adjunto en formato base64.
 * @param data Datos del correo electrónico
 * @param pdfBase64 Contenido del PDF en base64
 * @param fileName Nombre del archivo adjunto
 */
async function sendEmailWithAttachment(data: EmailDataHtml, fileName: string): Promise<void> {
  try {
    const mailOptions = {
      from: {
        name: "Backend Team",
        address: data.source
      },
      to: data.toAddresses,
      subject: data.subject,
      text: "Adjunto encontrarás el inventario de productos.",
      html: "<p>Adjunto encontrarás el inventario de productos.</p>",
      attachments: [
        {
          filename: fileName,
          path: path.join(__dirname, `../temp/${fileName}`),
          contentType: "application/pdf"
        }
      ]
    };

    // Enviar el correo electrónico con el archivo adjunto
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}

export { sendEmail, sendEmailWithHTMLFile, sendEmailWithAttachment };
