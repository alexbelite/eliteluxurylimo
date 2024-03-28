"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function CorporationsForm() {
  return (
    <Card className="w-[90%] mx-auto dark ">
      <CardHeader>Create an account with us!</CardHeader>
      <CardBody>
        <form className="flex flex-col gap-2">
          <Input
            isRequired
            label="Name"
            type="text"
            placeholder="Enter your name"
            required
            name="name"
          />
          <Input
            isRequired
            label="Business Name"
            type="text"
            placeholder="Enter your business name"
            required
            name="business_name"
          />
          <Input
            isRequired
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            name="email"
          />
          <Input
            isRequired
            label="Phone"
            type="tel"
            placeholder="Enter your phone number"
            required
            name="phone"
          />
          <Input
            isRequired
            label="Number of rides/Week"
            type="number"
            required
            name="rides"
          />
          <Textarea label="Notes" placeholder="Notes" />
        </form>
      </CardBody>
      <CardFooter>
        <Button>Send your Request</Button>
      </CardFooter>
    </Card>
  );
}
