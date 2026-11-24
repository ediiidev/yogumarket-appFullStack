import { Router } from "express";

import { validateBody } from "../middlewares/validate.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateBody(registerSchema), (_req, res) => {
  res.status(501).json({
    success: false,
    message: "Registration controller not implemented yet",
  });
});

export default router;
