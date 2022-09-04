import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";

export async function createCard(req: Request, res: Response) {
    const company = res.locals.company;
    const { employeeId, type } : { employeeId: number, type: any } = req.body;
    const result = await cardServices.createCard(company.id, employeeId, type);
    
    res.status(201).send(result);
}

export async function activateCard(req: Request, res: Response) {
    const { cardId, cardCVV, password } :
        { cardId: number, cardCVV: string, password: string } = req.body;
    const result = await cardServices.activateCard(cardId, cardCVV, password);

    res.status(200).send(result);
}