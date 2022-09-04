var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { connection } from "../../database.js";
export function findByCardId(cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield connection.query(`SELECT * FROM recharges WHERE "cardId"=$1`, [cardId]);
        return result.rows;
    });
}
export function insert(rechargeData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardId, amount } = rechargeData;
        connection.query(`INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`, [cardId, amount]);
    });
}
