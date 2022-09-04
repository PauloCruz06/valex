import { Request, Response, NextFunction } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";

export async function apiKeyValidation(req: Request, res: Response, next: NextFunction) {
    const xApiKey = req.header("x-api-key");
    
    const apiKey: string = xApiKey?.replace("Bearer ", "");
    if(!apiKey) return res.sendStatus(401);

    const company: any = await findByApiKey(apiKey);
    if(!company) return res.sendStatus(404);

    res.locals.company = company;
    next();
}