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
    
    const employee: any = await employeeRepository.findById(employeeId);
    if(!employee)
        throw { code: 'NotFound', message: 'employee not found' };
    if(companyId !== employee.companyId)
        throw { code: 'UnprocessableEntiny', message: 'employee does not belong to the company' };
    
    const employeeCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(employeeCard)
        throw { code: 'Conflit', message: 'employee already has this type of card' };

    const randomNumber = faker.finance.creditCardNumber('visa');
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
        isBlocked: true,
        type: type
    };

    await cardRepository.insert(card);

    return card;
}

function cardholderNameCreation(employeeFullName: string) : string {
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