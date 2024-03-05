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
 * /products/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Get a product from the database by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for the requested product.
 *               example: { status: 'OK', data: { id: '123', name: 'Product 1' }}
 */
router.get("/products/:id", getProductById);

/**
 * @openapi
 * /products/v1/enterprise/{id}:
 *   get:
 *     summary: Get products by enterprise ID
 *     description: Get products associated with a specific enterprise.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the enterprise
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for products associated with the enterprise.
 *               example: { status: 'OK', data: [{ id: '123', name: 'Product 1' }]}
 */
router.get("/enterprise/:id", getInventoryEnterprise);

/**
 * @openapi
 * /products/v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product and add it to the database.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *             required:
 *               - name
 *               - price
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for the created product.
 *               example: { status: 'OK', data: { id: '123', name: 'Product 1', price: 10 }}
 */
router.post("/products", createProduct);

/**
 * @openapi
 * /products/v1/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product in the database.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the product
 *               price:
 *                 type: number
 *                 description: New price of the product
 *             required:
 *               - name
 *               - price
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for the updated product.
 *               example: { status: 'OK', data: { id: '123', name: 'Updated Product', price: 15 }}
 */
router.put("/products/:id", updateProduct);

/**
 * @openapi
 * /products/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product from the database.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object indicating successful deletion.
 *               example: { status: 'OK', message: 'Product deleted successfully.' }
 */
router.delete("/products/:id", deleteProductById);

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
