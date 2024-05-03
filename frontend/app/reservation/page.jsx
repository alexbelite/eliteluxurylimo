"use client";

// React imports
import { useEffect, useState } from "react";

// UI Imports
import { Step, StepLabel, Stepper } from "@mui/material";

// UI Components Imports
import { ColorlibConnector } from "@/components/FormFiles/ReservationFormSteps/UI/ColorlibConnector";
import ColorlibStepIcon from "@/components/FormFiles/ReservationFormSteps/UI/ColorlibStepIcon";
import TripDetails from "@/components/FormFiles/ReservationFormSteps/TripDetails";
import VehicleSelection from "@/components/FormFiles/ReservationFormSteps/VehicleSelection";
import TripSummary from "@/components/FormFiles/ReservationFormSteps/TripSummary";
import LoginFormModal from "@/components/AccountMangement/LoginFormModal";

// Third party imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// Utils Imports
import { Services, airports } from "@/utils";
import { sendTripDataToAdmin, sendTripDataToClient } from "@/actions/emailjs";

// Redux Imports
import { getUser } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetReservationForm,
  setReservationFormData,
} from "@/store/ReservationFormSlice";
import { useSelector } from "react-redux";

// Icon imports
import { IoIosLogOut } from "react-icons/io";

dayjs.extend(utc);

// Form validation schema
const validationSchema = [
  yup.object({
    service: yup.string().required("Service is required"),
    pickUpDate: yup.string().required("Pick Up Date is required"),
    pickUpTime: yup
      .string()
      .required("Pick Up Time is required")
      .test(
        "pickUpTimeValid",
        "Pick up time must be at least 2 hours from the current time",
        (value) => {
          const currentTime = new Date();
          const pickUpTime = new Date(value);
          const timeDiff = pickUpTime.getTime() - currentTime.getTime();
          const hoursDiff = timeDiff / (1000 * 60 * 60);
          return hoursDiff >= 2;
        }
      ),
    passengers: yup.string().required("Passengers count is required"),
    luggage: yup.string().required("Luggage count is required"),
    pickUpAddress: yup.object().when("service", {
      is: (service) => service === "from_airport",
      then: () => yup.object().required("Pick up airport is required"),
      otherwise: () => yup.object().required("Pick up address is required"),
    }),
    stops: yup
      .array()
      .of(yup.object().required("Stops Address is required"))
      .optional(),
    dropOffAddress: yup.object().when("service", {
      is: (service) => service === "to_airport",
      then: () => yup.object().required("Drop off airport is required"),
      otherwise: () => yup.object().required("Drop off Address is required"),
    }),
    airline: yup.string().when("service", {
      is: (service) => service === "from_airport",
      then: () => yup.string().required("Airline is required"),
      otherwise: () => yup.string().optional(),
    }),
    flightNo: yup.string().when("service", {
      is: (service) => service === "from_airport",
      then: () => yup.string().required("Flight Number is required"),
      otherwise: () => yup.string().optional(),
    }),
    hours: yup.string().when("service", {
      is: (service) => service === "hourly_charter",
      then: () => yup.string().required("Flight Number is required"),
      otherwise: () => yup.string().optional(),
    }),
  }),
  yup.object({
    vehicle: yup.object().required("Please select a vehicle"),
  }),
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phone: yup.string().required("Phone number is required"),
    specialRequests: yup.string().optional(),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    meetGreet: yup.boolean().optional(),
    carSeats: yup.number().required(),
    returnTrip: yup.boolean().optional(),
    returnPickUpDate: yup.string().required("Pick Up Date is required"),
    returnPickUpTime: yup
      .string()
      .required("Pick Up Time is required")
      .test(
        "pickUpTimeValid",
        "Pick up time must be at least 2 hours from the current time",
        (value) => {
          const currentTime = new Date();
          const pickUpTime = new Date(value);
          const timeDiff = pickUpTime.getTime() - currentTime.getTime();
          const hoursDiff = timeDiff / (1000 * 60 * 60);
          return hoursDiff >= 2;
        }
      ),
    returnMeetGreet: yup.boolean().optional(),
    returnAirline: yup.string().when(["service", "returnTrip"], {
      is: (service, returnTrip) => service === "from_airport" && returnTrip,
      then: () => yup.string().required("Airline is required"),
      otherwise: () => yup.string().optional(),
    }),
    returnFlightNo: yup.string().when(["service", "returnTrip"], {
      is: (service, returnTrip) => service === "from_airport" && returnTrip,
      then: () => yup.string().required("Flight Number is required"),
      otherwise: () => yup.string().optional(),
    }),
  }),
];

const defaultValues = {
  service: Services[0].value,
  pickUpDate: dayjs(Date.now()).utc(true).format(),
  pickUpTime: dayjs(Date.now()).add(2, "hour").utc(true).format(),
  passengers: 1,
  luggage: 0,
  pickUpAddress: null,
  stops: [],
  dropOffAddress: airports[0],
  hours: 1,
  airline: "",
  flightNo: "",
  vehicle: "",
  specialRequests: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  meetGreet: false,
  carSeats: 0,
  returnTrip: false,
  returnPickUpDate: dayjs(Date.now()).utc(true).format(),
  returnPickUpTime: dayjs(Date.now()).add(3, "hour").utc(true).format(),
  returnMeetGreet: false,
  returnAirline: "",
  returnFlightNo: "",
};

const steps = ["Trip Details", "Vehicle selection", "Personal Info"];

export default function BookOnline() {
  const [activeStep, setActiveStep] = useState(0); // Form steps
  const [initialRender, setInitialRender] = useState(true);
  const [formSubmitBtnText, setFormSubmitBtnText] = useState("Request Quote");
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUser);
  const reservationFormData = useSelector(
    (state) => state.reservationForm.ReservationFormData
  );

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

  const handleNext = async () => {
    const isStepValid = await trigger();
    const values = getValues();
    const valuesData = {
      ...values,
      step: activeStep < steps.length - 1 ? activeStep + 1 : activeStep,
    };
    dispatch(setReservationFormData(valuesData));
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    dispatch(
      setReservationFormData({
        ...reservationFormData,
        step: activeStep > 0 ? activeStep - 1 : activeStep,
      })
    );
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data) => {
    try {
      let emailData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        service: Services.filter((el) => el.value === data.service)[0].label,
        pickUpDate: dayjs(data.pickUpDate).format("dddd, MMMM DD, YYYY"),
        pickUpTime: dayjs(data.pickUpTime).format("hh:mm A"),
        luggage: data.luggage,
        passengers: data.passengers,
        pickUpAddress: data.pickUpAddress.formatted_address
          ? data.pickUpAddress.formatted_address
          : data.pickUpAddress.name + " , " + data.pickUpAddress.address,
        dropOffAddress: data.dropOffAddress.formatted_address
          ? data.dropOffAddress.formatted_address
          : data.dropOffAddress.name + " , " + data.dropOffAddress.address,
        hours:
          data.service === "hourly_charter" ? data.hours : "Not based on hours",
        airline: data.airline,
        flightNo: data.flightNo,
        vehicle: data.vehicle.name,
        specialRequests: data.specialRequests,
        meetGreet: data.meetGreet,
        carSeats: data.carSeats,
      };
      if (data.stops.length > 0) {
        emailData = {
          ...emailData,
          stops: data.stops.map((el) => el.data.formatted_address).join(", "),
        };
      }

      if (data.returnTrip) {
        emailData = {
          ...emailData,
          returnPickUpDate: dayjs(data.returnPickUpDate).format(
            "dddd, MMMM DD, YYYY"
          ),
          returnPickUpTime: dayjs(data.returnPickUpTime).format("hh:mm A"),
          returnMeetGreet: data.returnMeetGreet,
          returnAirline: data.returnAirline,
          returnFlightNo: data.returnFlightNo,
        };
      }
      setFormSubmitBtnText("Requesting...");
      const clientEmailRespone = await sendTripDataToClient(emailData);
      if (clientEmailRespone.status === 200) {
        const res = await sendTripDataToAdmin(emailData);
        if (res.status === 200) {
          setFormSubmitBtnText("Requested Successfully");
          toast.success("Quote request received successfully.");
        }
      }
    } catch (error) {
      console.log(error);
      setFormSubmitBtnText("Form submission failed.");
    } finally {
      setTimeout(() => {
        reset();
        setFormSubmitBtnText("Request Quote");
        dispatch(resetReservationForm());
        setActiveStep(0);
      }, 3000);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TripDetails handleNext={handleNext} initialRender={initialRender} />
        );
      case 1:
        return (
          <VehicleSelection handleBack={handleBack} handleNext={handleNext} />
        );
      case 2:
        return (
          <TripSummary
            handleBack={handleBack}
            formSubmitBtnText={formSubmitBtnText}
          />
        );
      default:
        return "Unknown step";
    }
  }

  useEffect(() => {
    if (reservationFormData && initialRender) {
      for (const formValue in reservationFormData) {
        if (formValue === "step") {
          setActiveStep(reservationFormData["step"]);
        } else {
          setValue(formValue, reservationFormData[formValue], {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }
    }
    setInitialRender(false);
  }, [reservationFormData, setValue]);

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
            <h1 className="font-bold text-xl text-black">New Reservation</h1>
            {userData ? (
              <p className="flex items-center text-[#337ab7] text-md cursor-pointer">
                {userData.first_name}
              </p>
            ) : (
              <LoginFormModal
                buttonLabel={
                  <p className="flex items-center text-[#337ab7] text-md cursor-pointer">
                    <IoIosLogOut className="mr-1 text-xl" /> Login
                  </p>
                }
              />
            )}
          </div>
          <p className="mb-0 mt-4 text-lg">Reservations</p>
          <p className="italic text-sm">
            Book a trip or request a quote by filling out the form below.
          </p>
          <Stepper
            className="w-full mt-8"
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
    </section>
  );
}
