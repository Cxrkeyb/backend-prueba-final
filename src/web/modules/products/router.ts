import express from "express";
import {
  createProduct,
  deleteProductById,
  generatePDF,
  getInventory,
  getInventoryEnterprise,
  getProductById,
  updateProduct
} from "./controller/products";

const router = express.Router();

/**
 * @openapi
 * /products/v1/products:
 *   get:
 *     summary: Get a list of products
 *     description: Get a list of products from the database.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for products.
 *               example: { status: 'OK', data: [{ id: '123', name: 'Product 1' }]}
 */
router.get("/products", getInventory);

/**
 * @openapi
 * /products/v1/:
 *   get:
 *     summary: Get a list of products
 *     description: Get a list of products from the database.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for products.
 *               example: { status: 'OK', data: [{ id: '123', name: 'Product 1' }]}
 */
router.get("/products/:id", getProductById);

/**
 * @openapi
 * /products/v1/enterprise/:id
 *   get:
 *     summary: Get a list of products
 *     description: Get a list of products from the database.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for products.
 *               example: { status: 'OK', data: [{ id: '123', name: 'Product 1' }]}
 */
router.get("/enterprise/:id", getInventoryEnterprise);

/**
 * @openapi
 * /products/v1/:
 *   get:
 *     summary: Get a list of products
 *     description: Get a list of products from the database.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for products.
 *               example: { status: 'OK', data: [{ id: '123', name: 'Product 1' }]}
 */
router.post("/", createProduct);

/**
 * @openapi
 * /products/v1/:
 *   get:
 *     summary: Get a list of products
 *     description: Get a list of products from the database.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for products.
 *               example: { status: 'OK', data: [{ id: '123', name: 'Product 1' }]}
 */
router.put("/:id", updateProduct);

/**
 * @openapi
 * /products/v1/:
 *   get:
 *     summary: Get a list of products
 *     description: Get a list of products from the database.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for products.
 *               example: { status: 'OK', data: [{ id: '123', name: 'Product 1' }]}
 */
router.delete("/:id", deleteProductById);

/**
 * @openapi
 * /products/v1/pdf-inventory:
 *   post:
 *     summary: Generate and download a PDF of the inventory
 *     description: Generate and download a PDF of the inventory of products.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address to send the PDF to.
 *                 example: user@example.com
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for PDF generation.
 *               example: { status: 'OK', message: 'PDF generated and sent to email.' }
 */
router.post("/pdf-inventory", generatePDF);

export default router;
