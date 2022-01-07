const { PrismaClient } = require("@prisma/client");
const { app } = require("@electron/remote");
const { join, resolve } = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";
console.log(isDevelopment);

const dbPath = isDevelopment
  ? join(resolve("./prisma/dev.db"))
  : join(app.getPath("userData"), "database.db");
console.log("llega", dbPath);
console.log("llega", app);

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`,
    },
  },
});
