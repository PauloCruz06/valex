import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js";

export async function posPayment(req: Request, res: Response) {
    const { cardId, password, businessId, amount } :
        { cardId: number, password: string, businessId: number, amount: number } = req.body;
    const cardData = { id: cardId, password };

    const result = await paymentService.cardPurchases(cardData, businessId, amount);

    res.status(200).send(result);
}

export async function onlinePayment(req: Request, res: Response) {
    const {
        cardNumber,
        holderName,
        expirationDate,
        cardCVV,
        businessId,
        amount
        } : {
        cardNumber: string,
        holderName: string,
        expirationDate: string,
        cardCVV: string,
        businessId: number,
        amount: number
    } = req.body;

    const cardData = {
        number: cardNumber,
        cardholderName: holderName,
        expirationDate,
        securityCode: cardCVV
    };

    const result = await paymentService.cardPurchases(cardData, businessId, amount);

    res.status(200).send(result);
}