import "dotenv/config";

import express from "express";
import helmet from "helmet";
import rolesRouter from "./routes/roles.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

const PORT = Number(process.env.PORT ?? 3000);

// Middlewares
app.use(helmet());
app.use(express.json());

//Routes
app.use("/api/roles", rolesRouter);
app.use("/api/auth", authRouter);

// Ruta de comprobación
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "YoguMarket API is running",
    timestamp: new Date().toISOString(),
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`YoguMarket API running on port ${PORT}`);
});
