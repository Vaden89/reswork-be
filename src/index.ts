import "dotenv/config";
import cors from "cors";
import express from "express";
import ApiRouter from "./routers/router.js";
import { createError } from "./utils/app-error.js";
import { errorHandler } from "./middleware/error.middleware.js";
import os from "os";

import type { CorsOptions } from "cors";
import type { Response } from "express";

const PORT = Number(process.env.PORT ?? 3001);
const HOST = process.env.HOST ?? "0.0.0.0";

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/$/, "");
}

const configuredOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOrigins = new Set([
  ...configuredOrigins,
  "https://reswork-test.vercel.app",
  ...(process.env.NODE_ENV === "production" ? [] : ["http://localhost:3000"]),
]);

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/health", (req, res: Response) => {
  const uptime = os.uptime();
  const memoryUsage = os.totalmem() / os.freemem();
  res.status(200).json({
    data: {
      uptime,
      memoryUsage: memoryUsage.toFixed(2),
    },
    message: "alive",
  });
});

app.use("/api", ApiRouter);

app.use((_req, _res, next) => {
  next(createError("Not found", 404));
});

app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`Application is running on http://${HOST}:${PORT}`);
});
