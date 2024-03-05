import express from "express";
import { registerUser, registerUserAdmin, login } from "./controller/users";

const router = express.Router();

/**
 * @openapi
 * /users/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user in the database.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for user registration.
 *               example: { status: 'OK', data: { email: 'foo@bar.com' }}
 */
router.post("/register", registerUser);

/**
 * @openapi
 * /users/v1/register-admin:
 *   post:
 *     summary: Register a new user with access type ADMIN
 *     description: Register a new user in the database with access type ADMIN.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for user registration.
 *               example: { status: 'OK', data: { email: 'foo@bar.com' }}
 */
router.post("/register-admin", registerUserAdmin);

/**
 * @openapi
 * /users/v1/login:
 *   post:
 *     summary: User login
 *     description: Login with email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response object for user login.
 *               example: { status: 'OK', data: { email: 'foo@bar.com' }}
 */
router.post("/login", login);

export default router;
