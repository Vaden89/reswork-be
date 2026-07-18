import type { NextFunction, Request, Response } from "express";
import * as AiRefinementService from "../services/ai-refinement.service.js";
import * as TokenCreditService from "../services/token-credit.service.js";
import { rethrowAppError } from "../utils/app-error.js";

const RESPONSIBILITY_REFINEMENT_COST = 1;

export async function refineResponsibility(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { position, company, responsibility } = req.body;

    const credit = await TokenCreditService.checkTokenCredit(
      req.auth!.token,
      RESPONSIBILITY_REFINEMENT_COST,
    );

    if (!credit.ok) {
      return res.status(402).send({ message: credit.message, success: false });
    }

    const refinedText = await AiRefinementService.refineResponsibility({
      position,
      company,
      responsibility,
    });

    await TokenCreditService.deductTokenCredit(
      req.auth!.token,
      RESPONSIBILITY_REFINEMENT_COST,
    );

    return res
      .status(200)
      .send({
        data: refinedText,
        success: true,
        message: "Responsibility refined successfully",
      });
  } catch (error) {
    next(rethrowAppError(error, "refineResponsibility"));
  }
}

export async function buildOutWorkHistory(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
  } catch (error) {
    next(rethrowAppError(error, "buildOutWorkHistory"));
  }
}
