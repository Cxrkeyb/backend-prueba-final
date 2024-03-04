import dotenv from "dotenv";

dotenv.config();

const config = {
  postgresql: {
    host: process.env.DATABASE_HOST ?? "localhost",
    port: parseInt(process.env.DATABASE_PORT ?? "5432", 10),
    username: process.env.DATABASE_USERNAME ?? "backend",
    password: process.env.DATABASE_PASSWORD ?? "backend",
    database: process.env.DATABASE_NAME ?? "backend"
  },
  web: {
    port: parseInt(process.env.WEB_SERVER_PORT!, 10),
    cookieSecret: process.env.COOKIE_SECRET,
    allowedHosts: ["localhost"],
    appName: process.env.APP_NAME ?? "Backend",
    appUrl: process.env.APP_URL ?? "http://localhost",
    appKey: process.env.APP_KEY ?? ""
  },
  env: {
    isDevEnv: process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "migration",
    isMigrationEnv: process.env.MIGRATION_ENV === "true",
    isScriptEnv: process.env.NODE_ENV === "script",
    isProdEnv: process.env.NODE_ENV === "production"
  },
  jwt: {
    accessTokenExpireHr: process.env.JWT_AT_EXPIRE_HR ?? "30 seconds",
    refreshTokenExpireHr: process.env.JWT_RT_EXPIRE_HR ?? "1 day",
    accessTokenExpireTs: parseInt(process.env.JWT_AT_EXPIRE_TS ?? "30000", 10),
    refreshTokenExpireTs: parseInt(process.env.JWT_RT_EXPIRE_TS ?? "86400000", 10)
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    ses: {
      apiVersion: process.env.AWS_SES_API_VERSION ?? "2010-12-01"
    },
    awsEmail: process.env.AWS_EMAIL_FROM ?? ""
  }
};

export default config;
