"use client";
import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Textarea, Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { sendContactUsForm } from '@/actions/emailjs';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


export default function ContactUsPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [contactUs, setContactUs] = React.useState({
    name: "",
    phone_number: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactUs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (!contactUs.name || !contactUs.email || !contactUs.phone_number) {
        console.error("Error: Name, email, and phone number are required.");
        return alert('fill your info please')
      }
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not available yet");
        alert("Execute recaptcha not available yet likely meaning key not recaptcha key not set")
        return;
      }
      executeRecaptcha("formSubmitted").then(async () => {
        await sendContactUsForm(contactUs);
        console.log('execute console')
      })
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const carBanner = "https://res.cloudinary.com/dxvf93ovn/image/upload/v1709276575/alexlimoicons/carbanner_imxl1j.jpg";

  return (
    <section className="w-full max-sm:h-[500px] h-[600px] max-sm:flex-col flex justify-between items-center max-sm:mt-[60px] mt-[80px]">
      <div className="w-1/2 max-sm:w-full h-full bg-[#000000] max-sm:py-4">
        <Card className="dark w-[90%] mx-auto contactus_glass">
          <CardHeader>Contact Us</CardHeader>
          <CardBody className="flex flex-col gap-2 w-4/5 mx-auto">
            <Input
              name="name"
              value={contactUs.name}
              onChange={handleInputChange}
              variant="bordered" radius='none' type="text" placeholder="Enter your name"
            />
            <Input
              name="email"
              value={contactUs.email}
              onChange={handleInputChange}
              variant="bordered" radius='none' type="email" placeholder="Enter your email"
            />
            <Input
              name="phone_number"
              value={contactUs.phone_number}
              onChange={handleInputChange}
              variant="bordered" radius='none' type="tel" placeholder="Enter your phone number"
            />
            <Textarea
              name="message"
              value={contactUs.message}
              onChange={handleInputChange}
              aria-label="contact-us"
              variant="bordered" radius='none' placeholder="Enter your message"
            />
          </CardBody>
          <CardFooter className="w-4/5 mx-auto">
            {formSubmitted ? (
              <p>Form submitted successfully!</p>
            ) : (
              <Button onClick={onSubmit} variant="ghost" radius="none" className="ml-auto max-sm:w-[150px] w-[200px]" size="md">Send</Button>
            )}
          </CardFooter>
        </Card>
      </div>
      <div className="w-1/2 max-sm:w-full h-full relative max-sm:hidden">
        <Image src={carBanner} fill priority className="object-cover object-right" alt="contact us" />
      </div>
    </section>
  );
}
