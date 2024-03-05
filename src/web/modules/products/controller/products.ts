import { createPDF } from "../../../../utils/createPdf";
import { EnterpriseRepo, ProductRepo } from "../../../../databases/repos/index";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { sendEmailWithAttachment } from "../../../../services/emailService";
import config from "../../../../config";

/**
 * Controller to get the inventory of products.
 * @param req Express Request
 * @param res Express Response
 */
export async function getInventory(req: Request, res: Response): Promise<void> {
  try {
    // Get all products from the database
    const products = await ProductRepo.find();

    // Send the list of products as response
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Error fetching inventory" });
  }
}

/**
 * Controller to create a product.
 * @param req Express Request
 * @param res Express Response
 */
export async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, features, nit, currencies, code } = req.body;

  try {
    if (!name || !currencies || !features || !nit || !code) {
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
      currencies,
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

/**
 * Controller to get a product by its ID.
 * @param req Express Request
 * @param res Express Response
 */
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

/**
 * Controller to delete a product by its ID.
 * @param req Express Request
 * @param res Express Response
 */
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

/**
 * Controller to get the inventory of products for a specific enterprise.
 * @param req Express Request
 * @param res Express Response
 */
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
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Error fetching inventory" });
  }
}

/**
 * Controller to update a product.
 * @param req Express Request
 * @param res Express Response
 */
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
 * Controller to generate and download the PDF of the product inventory.
 * @param req Express Request
 * @param res Express Response
 */
export async function generatePDF(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    // Get all products from the database
    const products = await ProductRepo.find();

    const fileName = `inventory-${new Date().getTime().toString()}.pdf`;

    // Write the PDF to the temporary file system
    const filePath = path.join(__dirname, `../../../../temp/${fileName}`);
    await createPDF(products, filePath);

    await sendEmailWithAttachment(
      {
        toAddresses: [email],
        subject: "Product Inventory",
        source: config.aws.awsEmail
      },
      fileName
    );

    // Send the PDF file as response for download
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading PDF:", err);
        res.status(500).json({ error: "Error downloading PDF" });
      }
      // Delete the temporary PDF file after downloading
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
}
