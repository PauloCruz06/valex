var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { findByApiKey } from "../repositories/companyRepository.js";
export function apiKeyValidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const xApiKey = req.header("x-api-key");
        const apiKey = xApiKey === null || xApiKey === void 0 ? void 0 : xApiKey.replace("Bearer ", "");
        if (!apiKey)
            return res.sendStatus(401);
        const company = yield findByApiKey(apiKey);
        if (!company)
            return res.sendStatus(404);
        res.locals.company = company;
        next();
    });
}
