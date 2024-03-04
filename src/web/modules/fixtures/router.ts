// routes.ts

import express from "express";
import { generateFixtures } from "./controller/fixtures";

const router = express.Router();

// Otras rutas...

/**
 * @openapi
 * /fixtures/v1/generate:
 *   get:
 *     summary: Generar datos de prueba en la base de datos.
 *     description: Genera datos de prueba y los almacena en la base de datos.
 *     tags:
 *       - Fixtures
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Respuesta de generación de datos de prueba.
 *               example: { status: 'OK', message: 'Datos de prueba generados exitosamente.' }
 */
router.get("/generate", generateFixtures);

export default router;
