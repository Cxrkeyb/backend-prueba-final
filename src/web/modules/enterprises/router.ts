import express from "express";
import {
  createEnterprise,
  deleteEnterprise,
  getEnterpriseById,
  getEnterprises,
  updateEnterprise
} from "./controller/enterprises";

const router = express.Router();

/**
 * @openapi
 * /enterprises/v1/:
 *   get:
 *     summary: Get all enterprises
 *     description: Get all enterprises from the database.
 *     tags:
 *       - Enterprises
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for all enterprises.
 */
router.get("/", getEnterprises);

/**
 * @openapi
 * /enterprises/v1/:id:
 *   get:
 *     summary: Get all enterprises
 *     description: Get all enterprises from the database.
 *     tags:
 *       - Enterprises
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for all enterprises.
 */
router.get("/:id", getEnterpriseById);

/**
 * @openapi
 * /enterprises/v1/:
 *   post:
 *     summary: Create a new enterprise
 *     description: Create a new enterprise in the database.
 *     tags:
 *       - Enterprises
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for the new enterprise.
 */
router.post("/", createEnterprise);

/**
 * @openapi
 * /enterprises/v1/:id
 *   put:
 *     summary: Update an enterprise
 *     description: Update an enterprise in the database.
 *     tags:
 *       - Enterprises
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for the new enterprise.
 */
router.put("/:id", updateEnterprise);

/**
 * @openapi
 * /enterprises/v1/:id
 *   put:
 *     summary: Update an enterprise
 *     description: Update an enterprise in the database.
 *     tags:
 *       - Enterprises
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for the new enterprise.
 */
router.delete("/:id", deleteEnterprise);

export default router;
