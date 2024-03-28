"use client";
import  emailjs  from '@emailjs/browser';

export async function sendEmailJs(data) {
    emailjs.send("service_vequdrj","template_27rrkit", {
        to_name: "Alex Limo",
        from_name: data.first_name,
        from_airport:data.serviceDetail === 'from' ? data.airportName : '' ,
        from_airport_address: data.serviceDetail === 'from' ?  data.airportAddress : '',
        to_airport: data.serviceDetail === 'to' ? data.airportName : '',
        to_airport_address: data.serviceDetail === 'to' ? data.airportAddressB : '',
        pickup_address: data.pickup,
      dropoff_address: data.serviceDetail === 'to' ? '': data.dropoff,
      pickup_date: data.pickup_date,
        pickup_time: data.pickup_time,
        hours: data.hours,
        passengers: data.travellers,
        bags: data.bags,
        airline: data.airline,
        flight: data.flight,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        phone: data.phone,
        email: data.email,
        vehicle: data.selectedVehicle,
        notes: "Notes",
        reply_to: "If something wrong call to developer",
    }, {publicKey: "Qdoh3j0eeWCg7Vl-s"}).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      console.log(data)
        }, (error) => {
          console.log('FAILED...', error);
        });
}

export async function sendContactUsForm(data){


  emailjs.send("service_998xq47","template_rwl6bac",{
    from_name: data.name,
    to_name: "Alex Limo",
    phone_number: data.phone_number,
    email: data.email,
    message: data.message,
  },{publicKey: "Qdoh3j0eeWCg7Vl-s"})
}