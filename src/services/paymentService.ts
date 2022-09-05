import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import dotenv from "dotenv";

dotenv.config();
dayjs().format();

import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function cardPurchases(cardData: any, businessId: number, amount: number ) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    
    const cardsList = await cardRepository.find();
    const card = cardData.number ?
        cardsList.find(cards => cardData.number === cards.number)
        :
        cardsList.find(cards => cardData.id === cards.id)
    ;

    if(!card)
        throw { code: 'NotFound', message: 'card not found' };
    
    if(cardData.number) {
        if(cardData.cardholderName !== card.cardholderName)
            throw { code: 'UnprocessableEntity', message: 'Card holder invalid' };
        if(cardData.securityCode !== cryptr.decrypt(card.securityCode))
            throw { code: 'UnprocessableEntity', message: 'Card security code invalid' };
    } else {
        if(cardData.password !== cryptr.decrypt(card.password))
            throw { code: 'Unauthorized', message: 'password invalid' };
    }

    if(dayjs() >= dayjs(`01/${card.expirationDate}`))
        throw { code: 'UnprocessableEntity', message: 'Card is expired' };
    if(card.isBlocked )
        throw { code: 'UnprocessableEntity', message: 'Card is blocked' };
    
    const business = await businessRepository.findById(businessId);

    if(!business)
        throw { code: 'NotFound', message: 'business not found' };
    if(business.type !== card.type)
        throw { code: 'UnprocessableEntity', message: 'not allowed business type' };
    
    const rechargesList = await rechargeRepository.findByCardId(card.id); 
    const paymentsList = await paymentRepository.findByCardId(card.id);
    if(!rechargesList.length)
        throw { code: 'UnprocessableEntity', message: 'insufficient funds' };
    
    const recharges = rechargesList.map(
        recharge => recharge.amount
    ).reduce(
        (total, num) => total + num
    );

    if(!paymentsList.length) {
        if(recharges < amount)
            throw { code: 'UnprocessableEntity', message: 'insufficient funds' };
    } else {
        const payments = paymentsList.map(
            payment => payment.amount
        ).reduce(
            (total, num) => total + num
        );
        const balance = recharges - payments;

        if(balance < amount)
            throw { code: 'UnprocessableEntity', message: 'insufficient funds' };
    }
    
    await paymentRepository.insert({cardId: card.id, businessId, amount});

    return { message: 'payment made successfully' };
}