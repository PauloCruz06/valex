import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";

export async function createCard(req: Request, res: Response) {
    const company: any = res.locals.company;
    const { employeeId, type } : { employeeId: number, type: any } = req.body;
    const result = await cardServices.createCard(company.id, employeeId, type);
    
    res.status(201).send(result);
}