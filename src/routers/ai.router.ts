import express from "express";
import * as AiRefinementController from "../controllers/ai-refinement.controller.js";

import type { Router } from "express";

const router: Router = express.Router();

router.post(
  "/refine/responsibility",
  (req, res, next) => {
    console.log(req.body);

    next();
  },
  AiRefinementController.refineResponsibility,
);

export default router;
