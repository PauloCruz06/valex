import dayjs from 'dayjs';
import dotenv from "dotenv";

dotenv.config();
dayjs().format();

import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function rechargeCard(cardNumber: string, rechargeAmount: number) {
    const cardsList = await cardRepository.find();
    const card = cardsList.find(card => card.number === cardNumber);
    if(!card)
        throw { code: 'NotFound', message: 'card not found' };
    if(card.password === null || card.isBlocked)
        throw { code: 'UnprocessableEntity', message: 'Card is not active'};
    if(dayjs() >= dayjs(`01/${card.expirationDate}`))
        throw { code: 'UnprocessableEntity', message: 'card is expired' };

    const rechargeData = { cardId: card.id, amount: rechargeAmount };
    
    await rechargeRepository.insert(rechargeData);

    return { message: 'recharge done successfully' };
}