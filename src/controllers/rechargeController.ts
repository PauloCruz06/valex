import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js";

export async function rechargeCard( req: Request, res: Response ) {
    const { cardNumber, cardAmount } :
        { cardNumber: string, cardAmount: number } = req.body;
    const result = await rechargeService.rechargeCard(cardNumber, cardAmount);

    res.status(200).send(result);
}