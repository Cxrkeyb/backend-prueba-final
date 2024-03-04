import { createPDF } from "../../../../utils/createPdf";
import { EnterpriseRepo, ProductRepo } from "../../../../databases/repos/index";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { sendEmailWithAttachment } from "../../../../services/emailService";
import config from "../../../../config";

/**
 * Controlador para obtener el inventario de productos.
 * @param req Request de Express
 * @param res Response de Express
 */
export async function getInventory(req: Request, res: Response): Promise<void> {
  try {
    // Obtener todos los productos de la base de datos
    const products = await ProductRepo.find();

    // Enviar la lista de productos como respuesta
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Error fetching inventory" });
  }
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, prices, features, nit, code } = req.body;

  try {
    if (!name || !prices || !features || !nit || !code) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const foundNit = await EnterpriseRepo.findOne({
      where: { nit }
    });

    if (!foundNit) {
      res.status(404).json({ error: "Enterprise not found" });
      return;
    }

    const product = await ProductRepo.insert({
      name,
      currencies: prices,
      enterprise: foundNit,
      productProperties: features,
      productCode: code
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
}

export async function getProductById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const product = await ProductRepo.findOne({
      where: { id }
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
}

export async function deleteProductById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const product = await ProductRepo.findOne({
      where: { id }
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await ProductRepo.delete({
      id
    });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
}

export async function getInventoryEnterprise(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const enterprise = await EnterpriseRepo.findOne({
      where: { nit: id },
      relations: ["products"]
    });

    if (!enterprise) {
      res.status(404).json({ error: "Enterprise not found" });
      return;
    }

    res.status(200).json(enterprise.products);
  } catch (error) {
    // Si ocurre un error, lo manejamos y respondemos con un estado de error
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Error fetching inventory" });
  }
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { name, prices, features, nit, code } = req.body;
  try {
    const product = await ProductRepo.findOne({
      where: { id }
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (name) {
      product.name = name;
    }

    if (prices) {
      product.currencies = prices;
    }

    if (features) {
      product.productProperties = features;
    }

    if (nit) {
      const foundNit = await EnterpriseRepo.findOne({
        where: { nit }
      });

      if (!foundNit) {
        res.status(404).json({ error: "Enterprise not found" });
        return;
      }

      product.enterprise = foundNit;
    }

    if (code) {
      product.productCode = code;
    }

    await ProductRepo.save(product);

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
}
/**
 * Controlador para generar y descargar el PDF del inventario de productos.
 * @param req Request de Express
 * @param res Response de Express
 */
export async function generatePDF(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    // Obtener todos los productos de la base de datos
    const products = await ProductRepo.find();

    const fileName = `inventory-${new Date().getTime().toString()}.pdf`;

    // Escribir el PDF en el sistema de archivos temporal
    const filePath = path.join(__dirname, `../../../../temp/${fileName}`);
    await createPDF(products, filePath);

    await sendEmailWithAttachment(
      {
        toAddresses: [email],
        subject: "Inventario de productos",
        source: config.aws.awsEmail
      },
      fileName
    );

    // Enviar el archivo PDF como respuesta para descargar
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading PDF:", err);
        res.status(500).json({ error: "Error downloading PDF" });
      }
      // Eliminar el archivo PDF temporal después de descargarlo
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
}
