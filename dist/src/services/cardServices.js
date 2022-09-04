var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import dotenv from "dotenv";
dotenv.config();
dayjs().format();
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
export function createCard(companyId, employeeId, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const cryptr = new Cryptr(process.env.SECRET_KEY);
        const employee = yield employeeRepository.findById(employeeId);
        if (!employee)
            throw { code: 'NotFound', message: 'employee not found' };
        if (companyId !== employee.companyId)
            throw { code: 'UnprocessableEntity', message: 'employee does not belong to the company' };
        const employeeCard = yield cardRepository.findByTypeAndEmployeeId(type, employeeId);
        if (employeeCard)
            throw { code: 'Conflit', message: 'employee already has this type of card' };
        const randomNumber = faker.finance.creditCardNumber('visa');
        const cardNumber = yield cardRepository.find();
        if (cardNumber.find(cardNum => randomNumber === cardNum.number))
            throw { code: 'Conflit', message: 'Card number already exists, please try again' };
        const cardName = cardholderNameCreation(employee.fullName);
        const expirationDate = dayjs().add(5, 'year').format('MM/YY');
        const cardCVV = faker.finance.creditCardCVV();
        const cardCVVEncrypted = cryptr.encrypt(cardCVV);
        const card = {
            employeeId: employeeId,
            number: randomNumber,
            cardholderName: cardName,
            securityCode: cardCVVEncrypted,
            expirationDate: expirationDate,
            isVirtual: false,
            isBlocked: false,
            type: type
        };
        yield cardRepository.insert(card);
        const cardId = yield cardRepository.findByCardDetails(randomNumber, cardName, expirationDate);
        return {
            id: cardId.id,
            number: randomNumber,
            cardholderName: cardName,
            securityCode: cardCVV,
            expirationDate: expirationDate,
            type: type
        };
    });
}
export function activateCard(cardId, cardCVV, cardPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const cryptr = new Cryptr(process.env.SECRET_KEY);
        const card = yield cardRepository.findById(cardId);
        if (!card)
            throw { code: 'NotFound', message: 'card not found' };
        if (dayjs() >= dayjs(`01/${card.expirationDate}`))
            throw { code: 'UnprocessableEntity', message: 'card is expired' };
        if (card.password !== null)
            throw { code: 'UnprocessableEntity', message: 'card is already active' };
        if (cardCVV !== cryptr.decrypt(card.securityCode))
            throw { code: 'Unauthorized', message: 'security code invalid' };
        const passwordTest = /[0-9]{4}/;
        if (!passwordTest.test(cardPassword))
            throw { code: 'Unauthorized', message: 'password invalid' };
        const passwordEncrypted = cryptr.encrypt(cardPassword);
        yield cardRepository.update(cardId, { password: passwordEncrypted });
        return { password: cardPassword };
    });
}
function cardholderNameCreation(employeeFullName) {
    const arrName = employeeFullName.split(' ');
    let strName = "";
    for (let i = 0; i < arrName.length; i++) {
        if (i === 0 || i === arrName.length - 1) {
            strName += arrName[i] + " ";
        }
        else {
            if (arrName[i].length >= 3)
                strName += arrName[i].slice(0, 1) + " ";
        }
    }
    return strName.toUpperCase().trim();
}
