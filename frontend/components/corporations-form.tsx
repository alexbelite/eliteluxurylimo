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
import { CreateAccountWithUsProps } from "@/types";
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendCreateAccountData } from "@/actions/emailjs";
import { useState } from "react";
import { ErrorMessage } from "./FormFiles/ErrorMessage";

export default function CorporationsForm() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const defaultValues: CreateAccountWithUsProps = {
    name: "",
    business_name: "",
    email: "",
    phone: "",
    rides: "",
    notes: "",
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name must be of atleast 3 characters")
      .required("Name is required"),
    business_name: yup
      .string()
      .min(8, "Business name must be of atleast 8 characters")
      .required("Business name is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    phone: yup
      .string()
      .min(10, "Phone number must be of atleast 10 digits")
      .required("Phone is required"),
    rides: yup.string().required("Number of rides is required"),
    notes: yup.string().optional(),
  });

  const {
    control,
    reset,
    setValue,
    watch,
    resetField,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateAccountWithUsProps>({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const submitForm: SubmitHandler<CreateAccountWithUsProps> = async (data) => {
    try {
      const res = await sendCreateAccountData(data);
      if (res.status === 200) {
        reset();
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
        }, 4000);
      }
    } catch (error) {
      alert("Form submission failed! Please try again.");
      console.log(error);
    }
  };

  return (
    <Card className="w-[90%] mx-auto dark ">
      <CardHeader>Create an account with us!</CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-2"
          method="POST"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submitForm)}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="Name"
                type="text"
                placeholder="Enter your name"
                {...field}
              />
            )}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          <Controller
            name="business_name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="Business Name"
                type="text"
                placeholder="Enter your business name"
                {...field}
              />
            )}
          />
          {errors.business_name && (
            <ErrorMessage>{errors.business_name.message}</ErrorMessage>
          )}
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...field}
              />
            )}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="Phone"
                type="tel"
                placeholder="Enter your phone number"
                {...field}
              />
            )}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
          <Controller
            name="rides"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="Number of rides/Week"
                type="number"
                {...field}
              />
            )}
          />
          {errors.rides && <ErrorMessage>{errors.rides.message}</ErrorMessage>}
          <Controller
            name="notes"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Textarea label="Notes" placeholder="Notes" {...field} />
            )}
          />
          <CardFooter className="px-0">
            {formSubmitted ? (
              <p>Form submitted successfully!</p>
            ) : (
              <Button type="submit">Send your Request</Button>
            )}
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
}
