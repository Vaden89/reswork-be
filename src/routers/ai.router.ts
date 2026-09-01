import express from "express";
import * as AiRefinementController from "../controllers/ai-refinement.controller.js";
import * as AiParsingController from "../controllers/ai-parsing.controller.js";

import type { Router } from "express";

const router: Router = express.Router();

router.post(
  "/refine/responsibility",
  AiRefinementController.refineResponsibility,
);

router.post("/parse/resume", AiParsingController.parseResumeText);

export default router;
