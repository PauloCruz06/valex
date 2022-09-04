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
import { mapObjectToUpdateQuery } from "../utils/sqlUtils.js";
export function find() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield connection.query("SELECT * FROM cards");
        return result.rows;
    });
}
export function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield connection.query("SELECT * FROM cards WHERE id=$1", [id]);
        return result.rows[0];
    });
}
export function findByTypeAndEmployeeId(type, employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield connection.query(`SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`, [type, employeeId]);
        return result.rows[0];
    });
}
export function findByCardDetails(number, cardholderName, expirationDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield connection.query(` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`, [number, cardholderName, expirationDate]);
        return result.rows[0];
    });
}
export function insert(cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { employeeId, number, cardholderName, securityCode, expirationDate, password, isVirtual, originalCardId, isBlocked, type, } = cardData;
        connection.query(`
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `, [
            employeeId,
            number,
            cardholderName,
            securityCode,
            expirationDate,
            password,
            isVirtual,
            originalCardId,
            isBlocked,
            type,
        ]);
    });
}
export function update(id, cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { objectColumns: cardColumns, objectValues: cardValues } = mapObjectToUpdateQuery({
            object: cardData,
            offset: 2,
        });
        connection.query(`
    UPDATE cards
      SET ${cardColumns}
    WHERE $1=id
  `, [id, ...cardValues]);
    });
}
export function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        connection.query("DELETE FROM cards WHERE id=$1", [id]);
    });
}
