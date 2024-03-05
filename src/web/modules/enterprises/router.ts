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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enterprise'
 */

router.get("/", getEnterprises);

/**
 * @openapi
 * /enterprises/v1/{id}:
 *   get:
 *     summary: Get enterprise by ID
 *     description: Get a single enterprise by its ID from the database.
 *     tags:
 *       - Enterprises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the enterprise to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enterprise'
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnterpriseInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enterprise'
 */

router.post("/", createEnterprise);

/**
 * @openapi
 * /enterprises/v1/{id}:
 *   put:
 *     summary: Update an existing enterprise
 *     description: Update an existing enterprise in the database.
 *     tags:
 *       - Enterprises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the enterprise to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnterpriseInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enterprise'
 */

router.put("/:id", updateEnterprise);

/**
 * @openapi
 * /enterprises/v1/{id}:
 *   delete:
 *     summary: Delete an enterprise
 *     description: Delete an enterprise from the database by ID.
 *     tags:
 *       - Enterprises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the enterprise to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */

router.delete("/:id", deleteEnterprise);

export default router;
