// routes.ts

import express from "express";
import { generateFixtures } from "./controller/fixtures";

const router = express.Router();

// Other routes...

/**
 * @openapi
 * /fixtures/v1/generate:
 *   get:
 *     summary: Generate test data in the database.
 *     description: Generates test data and stores it in the database.
 *     tags:
 *       - Fixtures
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response for generating test data.
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Indicates the status of the operation.
 *                   example: 'OK'
 *                 message:
 *                   type: string
 *                   description: Additional message about the operation.
 *                   example: 'Test data generated successfully.'
 */
router.get("/generate", generateFixtures);

export default router;
