"use client";
import {
    CreditCard,
    PaymentForm,
} from "react-square-web-payments-sdk";
  import submitPayment from '/action'

export default function PaymentFormCompoent() {
    return (
      <div>
        <PaymentForm
          applicationId={process.env.SQUARE_APP_ID}
          // applicationId="sandbox-sq0idb-mJAOR3_17DUcaoQxMKkTmA"
          cardTokenizeResponseReceived={async (token,verifiedBuyer) => {
            const result = await submitPayment(token.token)
            console.log('token:', token);
            console.log('result:', result);
            console.log('verifiedBuyer:', verifiedBuyer);
          }}
          locationId={process.env.SQUARE_LOCATION_ID}
          // locationId="LXKERR1EQZ850"
        >
            <CreditCard/>
        </PaymentForm>
      </div>
    )
  }