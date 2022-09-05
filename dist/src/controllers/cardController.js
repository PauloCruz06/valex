var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as cardServices from "../services/cardServices.js";
export function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = res.locals.company;
        const { employeeId, type } = req.body;
        const result = yield cardServices.createCard(company.id, employeeId, type);
        res.status(201).send(result);
    });
}
export function activateCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardId, cardCVV, password } = req.body;
        const result = yield cardServices.activateCard(cardId, cardCVV, password);
        res.status(200).send(result);
    });
}
export function blockCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardNumber, password } = req.body;
        const result = yield cardServices.blockCard(cardNumber, password, true);
        res.status(200).send(result);
    });
}
export function unblockCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardNumber, password } = req.body;
        const result = yield cardServices.blockCard(cardNumber, password, false);
        res.status(200).send(result);
    });
}
