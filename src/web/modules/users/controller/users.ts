import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { validateEmail } from "../../../../utils/validateEmail";
import { UserRepo } from "../../../../databases/repos/index";
import RegisterInput from "../interfaces/RegisterInput";
import { generateJwt } from "../../../../services/jose";
import config from "../../../../config";
import { getUserFromDatabase } from "./repository";
import { capitalizeName } from "../../../../utils/capitalizeName";

/**
 * @summary Register a new user with access type USER
 * @param {Request} req request of the express should contain the body with the data of the user
 * @param {Response} res response of the express, if the user is created then return the user data else return a message indicating the error
 * @returns A promise indicating it needs to be async and wait
 */
async function registerUser(req: Request, res: Response): Promise<void> {
  // Obtener los datos del cuerpo de la solicitud
  const { email, password }: RegisterInput = req.body || {};
  try {
    // Validar los datos
    if (!email || !password) {
      res.status(400).json({ error: "Bad data in body" });
      return;
    }

    if (password.length < 8 && password.length > 20) {
      res.status(400).json({ error: "Password too short" });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Intentar crear el usuario
    const existingUser = await UserRepo.findOne({
      where: { email }
    });

    if (existingUser) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    const name = email.split("@")[0];

    // Crear el usuario
    const newUser = await UserRepo.insert({
      email,
      password: hashedPassword,
      name
    });

    // Crear tokens y establecerlos en las cookies si todo está bien
    // JwtHelper.CreateAndSetBOTHTokensEncodedInCookies(res, newUser, JwtHelper.TokenAccessType.USER);

    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
}

/**
 * @summary Register a new user with access type ADMIN
 * @param {Request} req request of the express should contain the body with the data of the user
 * @param {Response} res response of the express, if the user is created then return the user data else return a message indicating the error
 * @returns A promise indicating it needs to be async and wait
 */
async function registerUserAdmin(req: Request, res: Response): Promise<void> {
  // Obtener los datos del cuerpo de la solicitud
  const { email, password, type }: RegisterInput = req.body || {};
  try {
    // Validar los datos
    if (!email || !password) {
      res.status(400).json({ error: "Bad data in body" });
      return;
    }

    if (password.length < 8 && password.length > 20) {
      res.status(400).json({ error: "Password too short" });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Intentar crear el usuario
    const existingUser = await UserRepo.findOne({
      where: { email }
    });

    if (existingUser) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    if (!type || type !== "admin") {
      res.status(400).json({ error: "Invalid user type" });
      return;
    }

    const name = email.split("@")[0];

    // Crear el usuario
    const newUser = await UserRepo.insert({
      email,
      password: hashedPassword,
      type,
      name
    });

    // Crear tokens y establecerlos en las cookies si todo está bien
    // JwtHelper.CreateAndSetBOTHTokensEncodedInCookies(res, newUser, JwtHelper.TokenAccessType.USER);

    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
}
/**
 * @summary Login a user
 * @param {Request} req request of the express should contain the body with the data of the user
 * @param {Response} res response of the express, if the user is created then return the user data else return a message indicating the error
 * @returns A promise indicating it needs to be async and wait
 * @description This function will login a user and return a jwt token
 * @function login
 */
async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Verificar si el email y la contraseña están presentes
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Simular una consulta para obtener el usuario de la base de datos
    const user = await getUserFromDatabase(email);

    // Verificar si el usuario existe
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    // Generar tokens de acceso y actualización
    const jwtRt = await generateJwt(JSON.stringify(user), config.jwt.refreshTokenExpireHr);

    await UserRepo.update(user.id, { rtToken: bcrypt.hashSync(jwtRt, 10) });

    // Establecer la cookie con el token de actualización
    res.cookie("jwt", jwtRt, {
      httpOnly: true,
      domain: !config.web.appUrl.match(/^(http(s)?:\/\/localhost)/)
        ? config.web.appUrl.replace(/(^\w+:|^)\/\//, "")
        : undefined,
      sameSite: !config.web.appUrl.match(/^(http(s)?:\/\/localhost)/) ? "strict" : undefined,
      // overwrite: true,
      expires: new Date(new Date().getTime() + config.jwt.refreshTokenExpireTs)
    });

    // Generar tokens de acceso y actualización
    const jwtAt = await generateJwt(JSON.stringify(user), config.jwt.accessTokenExpireHr);
    // Enviar la respuesta con los tokens y la información del usuario

    const nameCapitalize = capitalizeName(user.name);

    res.status(200).json({
      status: 200,
      data: {
        jwt: jwtAt,
        expires_at: Math.round(
          new Date(new Date().getTime() + config.jwt.accessTokenExpireTs).getTime() / 1000
        ),
        current_time_server: Math.round(new Date().getTime() / 1000),
        user: {
          name: `${nameCapitalize}`,
          email: user.email,
          role: user.type || "user"
        }
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
}

export { registerUser, registerUserAdmin, login };
