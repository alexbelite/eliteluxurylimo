"use client";
import DateComponent from "@/components/FormFiles/DatePicker";
import PeopleForm from "@/components/FormFiles/PeopleForm";
import { ColorlibConnector } from "@/components/FormFiles/ReservationFormSteps/UI/ColorlibConnector";
import ColorlibStepIcon from "@/components/FormFiles/ReservationFormSteps/UI/ColorlibStepIcon";
import SearchLocation from "@/components/FormFiles/SearchLocation";
import SelectService from "@/components/FormFiles/SelectService";
import Map from "@/components/GoogleMapFiles/GoogleMap";
import { Button, MobileStepper, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";

// Third party imports
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TripDetails from "@/components/FormFiles/ReservationFormSteps/TripDetails";
import { Services } from "@/utils";

// Form validation schema
const validationSchema = [
  yup.object({
    service: yup.string().required(),
    pickUpDate: yup.string().required(),
    pickUpTime: yup.string().required(),
    passengers: yup.string().required(),
    luggage: yup.string().required(),
    pickUpAddress: yup.string().required("Pick up address is required"),
    stops: yup
      .array()
      .of(yup.string().required("Address is required"))
      .optional(),
    dropOffAddress: yup.string().required("Drop off Address is required"),
    airline: yup.string().optional(),
    flightNo: yup.string().optional(),
  }),
  yup.object({
    vehicle: yup.string().required("Please select a vehicle"),
  }),
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phone: yup.string().required("Phone number is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
  }),
];

const defaultValues = {
  service: Services[0].value,
  pickUpDate: "",
  pickUpTime: "",
  passengers: 0,
  luggage: 0,
  pickUpAddress: "",
  stops: [],
  dropOffAddress: "",
  airline: "",
  flightNo: "",
  vehicle: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

const steps = ["Trip Details", "Vehicle selection", "Personal Info"];

export default function BookOnline() {
  const [activeStep, setActiveStep] = useState(0); // Form steps

  const schema = validationSchema[activeStep];

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
    reset,
    trigger,
  } = formMethods;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <TripDetails />;
      case 1:
        return "";
      case 2:
        return "";
      default:
        return "Unknown step";
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <section className="w-full flex items-center justify-center bg-white py-24 text-black">
      <div className="md:w-[90%]">
        <p className="text-red-500">
          <span className="font-bold">Note : </span>
          To ensure you don’t miss our quotes, confirmations, or any other
          correspondence, please remember to check your spam/junk folders, as
          they may occasionally end up there.
        </p>
        <div className="mt-20 border-[1px] w-full border-slate-300 border-solid p-4 rounded-md">
          <div className="w-full flex items-center justify-between">
            <h1 className="font-bold text-2xl text-black">New Reservation</h1>
            <p className="flex items-center text-[#337ab7] text-md cursor-pointer">
              <IoIosLogOut className="mr-1 text-xl" /> Login
            </p>
          </div>
          <p className="mb-0 mt-6 text-xl">Reservations</p>
          <p className="italic">
            Book a trip or request a quote by filling out the form below.
          </p>
          <Stepper
            className="w-full mt-10"
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => {
              return (
                <Step className="!p-0" key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <FormProvider {...formMethods}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center overflow-auto"
            >
              {getStepContent(activeStep)}
            </form>
          </FormProvider>
        </div>
      </div>
      {/* <div className=" w-1/2 max-sm:w-full h-full flex flex-col items-center justify-center">
        <SelectService />
        <DateComponent />
        <SearchLocation />
        <div className="w-full px-4">
          <PeopleForm />
        </div>
      </div>
      <div className="w-1/2 max-sm:w-full flex justify-start items-start h-1/2 max-md:h-full md:h-[540px] max-sm:h-[300px]">
        <Map />
      </div> */}
    </section>
  );
}
