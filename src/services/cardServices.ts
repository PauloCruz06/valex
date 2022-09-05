import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import dotenv from "dotenv";

dotenv.config();
dayjs().format();

import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard( companyId: number, employeeId: number, type: any) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    
    const employee = await employeeRepository.findById(employeeId);
    if(!employee)
        throw { code: 'NotFound', message: 'employee not found' };
    if(companyId !== employee.companyId)
        throw { code: 'UnprocessableEntity', message: 'employee does not belong to the company' };
    
    const employeeCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(employeeCard)
        throw { code: 'Conflit', message: 'employee already has this type of card' };
   
    const randomNumber = faker.finance.creditCardNumber('visa');
    const cardNumber = await cardRepository.find();
    if(cardNumber.find(cardNum => randomNumber === cardNum.number))
        throw { code: 'Conflit', message: 'Card number already exists, please try again' };

    const cardName = cardholderNameCreation(employee.fullName);
    const expirationDate = dayjs().add(5, 'year').format('MM/YY');
    
    const cardCVV = faker.finance.creditCardCVV();
    const cardCVVEncrypted = cryptr.encrypt(cardCVV);

    const card: any = {
        employeeId: employeeId,
        number: randomNumber,
        cardholderName: cardName,
        securityCode: cardCVVEncrypted,
        expirationDate: expirationDate,
        isVirtual: false,
        isBlocked: false,
        type: type
    };

    await cardRepository.insert(card);
    const cardId = await cardRepository.findByCardDetails(randomNumber, cardName, expirationDate);

    return {
        id: cardId.id,
        number: randomNumber,
        cardholderName: cardName,
        securityCode: cardCVV,
        expirationDate: expirationDate,
        type: type
    };
}

export async function activateCard( cardId: number, cardCVV: string, cardPassword: string ) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    
    const card = await cardRepository.findById(cardId);
    if(!card)
        throw { code: 'NotFound', message: 'card not found' };
    if(dayjs() >= dayjs(`01/${card.expirationDate}`))
        throw { code: 'UnprocessableEntity', message: 'card is expired' };
    if(card.password !== null)
        throw { code: 'UnprocessableEntity', message: 'card is already active' };
    if(cardCVV !== cryptr.decrypt(card.securityCode))
        throw { code: 'Unauthorized', message: 'security code invalid' };
    
    const passwordTest = /[0-9]{4}/;
    if(!passwordTest.test(cardPassword))
        throw { code: 'Unauthorized', message: 'password invalid' };

    const passwordEncrypted: any = cryptr.encrypt(cardPassword);
    
    await cardRepository.update(cardId, { password: passwordEncrypted });

    return { password: cardPassword };
}

export async function blockCard( cardNumber: string, cardPassword: string, isCardBlocked: boolean ) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const cardsList = await cardRepository.find();
    const card = cardsList.find(card => card.number === cardNumber);
    if(!card)
        throw { code: 'NotFound', message: 'card not found' };
    if(dayjs() >= dayjs(`01/${card.expirationDate}`))
        throw { code: 'UnprocessableEntity', message: 'card is expired' };
    if(card.isBlocked === isCardBlocked)
        throw { code: 'UnprocessableEntity', message: 'card is already blocked/unblocked' };
    if(cardPassword !== cryptr.decrypt(card.password))
        throw { code: 'Unauthorized', message: 'password invalid' };
    
    await cardRepository.update(card.id, { isBlocked: isCardBlocked });

    return { message: 'Card has been blocked/unblocked successfully' };
}

function cardholderNameCreation( employeeFullName: string ) : string {
    const arrName = employeeFullName.split(' ');
    let strName = "";
   
    for(let i=0; i<arrName.length; i++) { 
      if(i === 0 || i === arrName.length-1 ) {
        strName += arrName[i] + " ";
      } else {
          if(arrName[i].length >= 3)
             strName += arrName[i].slice(0, 1) + " ";
      }
    }
  
    return strName.toUpperCase().trim();
}