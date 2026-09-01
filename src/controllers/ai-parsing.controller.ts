import { rethrowAppError } from "../utils/app-error.js";
import type { NextFunction, Request, Response } from "express";
import * as aiParsingService from "../services/ai-parsing.service.js";
import * as TokenCreditService from "../services/token-credit.service.js";

const RESUME_PARSING_COST = 5;

export async function parseResumeText(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { text } = req.body;

    const credit = await TokenCreditService.checkTokenCredit(
      req.auth!.token,
      RESUME_PARSING_COST,
    );

    if (!credit.ok) {
      return res.status(402).send({ message: credit.message, success: false });
    }

    const parsed = await aiParsingService.parseResumeTextService(text);

    await TokenCreditService.deductTokenCredit(
      req.auth!.token,
      RESUME_PARSING_COST,
    );
    res.status(200).send({ data: parsed, success: true });
  } catch (error) {
    next(rethrowAppError(error, "parseResumeText"));
  }
}
