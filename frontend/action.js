'use server'

import { Client } from 'square'
import { randomUUID } from 'crypto'

BigInt.prototype.toJSON = function () {
  return this.toString()
}

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_TOKEN,
//   environment: 'sandbox',
  environment: 'production',
})

export default async function submitPayment() {
    try {
        const response = await paymentsApi.createPayment({
          sourceId: 'cnon:card-nonce-ok',
          idempotencyKey: randomUUID(),
          amountMoney: {
            amount: 1,
            currency: 'USD'
          },
          autocomplete: true,
          locationId: process.env.SQUARE_LOCATION_ID,
          buyerEmailAddress: 'joelfrontend@gmail.com'
        });
      return response.result
        console.log(response.result);
      } catch(error) {
        console.log(error);
      }
}