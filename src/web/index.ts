import config from ".././config/index";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { Stream } from "stream"; // Import Stream from "stream"
import products from "./modules/products/router";
import users from "./modules/users/router";
import enterprises from "./modules/enterprises/router";
import fixtures from "./modules/fixtures/router";

import logger from "../logger";
import { generateJwt } from "../services/jose";

// Custom logger stream
class LoggerStream extends Stream.Writable {
  _write(chunk: any, encoding: string, callback: () => void) {
    logger.info(chunk.toString());
    callback();
  }
}

const ws = express();

ws.use(
  cors({
    origin: "*"
  })
);

// Permitir todas las peticiones para todas las rutas
ws.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

ws.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Use morgan with the custom logger stream
ws.use(morgan("dev", { stream: new LoggerStream() }));

ws.use(express.json());

ws.use(cookieParser(config.web.cookieSecret));

// Rutas
ws.get("/", async (req, res) => {
  try {
    const newJWT = await generateJwt(
      JSON.stringify({ user: "user", role: "admin" }),
      config.jwt.accessTokenExpireHr
    );

    res.type("json").send(
      JSON.stringify(
        {
          status: "ON",
          time: new Date().toUTCString(),
          date: new Date().toISOString(),
          jwt: newJWT
        },
        null,
        2
      )
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

ws.use("/products/v1", products);

ws.use("/users/v1", users);

ws.use("/enterprises/v1", enterprises);

ws.use("/fixtures/v1", fixtures);

export default ws;
