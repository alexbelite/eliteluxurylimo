"use client";

// React imports
import { useEffect, useState } from "react";

// UI Imports
import {
  Step,
  StepLabel,
  Stepper,
  Popover,
  Button,
  IconButton,
} from "@mui/material";

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
import moment from "moment-timezone";

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
import { MdMenu } from "react-icons/md";

// Set the default time zone to Chicago
moment.tz.setDefault("America/Chicago");

const steps = ["Trip Details", "Vehicle selection", "Personal Info"];

export default function BookOnline() {
  const [activeStep, setActiveStep] = useState(0); // Form steps
  const [initialRender, setInitialRender] = useState(true);
  const [formSubmitBtnText, setFormSubmitBtnText] = useState("Request Quote");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUser);
  const reservationFormData = useSelector(
    (state) => state.reservationForm.ReservationFormData
  );

  const defaultValues = {
    service: Services[0].value,
    pickUpDate: moment().format(),
    pickUpTime: moment().format(),
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
    returnPickUpDate: moment().format(),
    returnPickUpTime: moment().format(),
    returnMeetGreet: false,
    returnAirline: "",
    returnFlightNo: "",
  };

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
          (value, context) => {
            const pickUpDate = moment(context.parent.pickUpDate);
            const currentDate = moment();

            const fromTime = currentDate; // Current time
            const toTime = moment(
              `${pickUpDate.format("YYYY-MM-DD")}T${value.split("T")[1]}`
            ); // Specific time in UTC

            const hoursDiff = toTime.diff(fromTime, "hours");

            // Check if the pickup time is at least 2 hours from the current time
            return hoursDiff >= 1;
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
      meetGreet: yup.boolean().required(),
      carSeats: yup.number().required(),
      returnTrip: yup.boolean().required(),
      returnPickUpDate: yup.string().required("Pick Up Date is required"),
      returnPickUpTime: yup
        .string()
        .when("returnTrip", {
          is: true,
          then: () =>
            yup
              .string()
              .required("Pick Up Time is required")
              .test(
                "pickUpTimeValid",
                "Pick up time must be at least 1 hours from the Initial time",
                (value, context) => {
                  const returnPickUpDate = moment(
                    context.parent.returnPickUpDate
                  );
                  const currentDate = moment(reservationFormData.pickUpTime);

                  const fromTime = currentDate; // Current time
                  const toTime = moment(
                    `${returnPickUpDate.format("YYYY-MM-DD")}T${
                      value.split("T")[1]
                    }`
                  ); // Specific time in UTC

                  const hoursDiff = toTime.diff(fromTime, "hours");
                  // Check if the pickup time is at least 2 hours from the current time
                  return hoursDiff >= 1;
                }
              ),
          otherwise: () => yup.string().required(),
        })
        .required(),
      returnMeetGreet: yup.boolean().required(),
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const schema = validationSchema[activeStep];
  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "all",
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

    if (isStepValid) {
      const valuesData = {
        ...values,
        step: activeStep < steps.length - 1 ? activeStep + 1 : activeStep,
      };
      dispatch(setReservationFormData(valuesData));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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
        pickUpDate: moment(data.pickUpDate).format("dddd, MMMM DD, YYYY"),
        pickUpTime: moment(data.pickUpTime).format("hh:mm A"),
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
        meetGreet: data.meetGreet ? "Yes" : "No",
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
          returnPickUpDate: moment(data.returnPickUpDate).format(
            "dddd, MMMM DD, YYYY"
          ),
          returnPickUpTime: moment(data.returnPickUpTime).format("hh:mm A"),
          returnMeetGreet: data.returnMeetGreet ? "Yes" : "No",
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
  }, [reservationFormData, setValue, initialRender]);

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
            <div>
              <IconButton
                aria-describedby={id}
                className="!p-0 items-center !flex hover:!bg-transparent"
                onClick={handleClick}
              >
                <MdMenu className="text-2xl mr-1 text-[#337ab7]" />
                <p className="text-xs text-[#337ab7]">New Reservation</p>
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <p
                  className="p-2 px-6 text-sm cursor-pointer"
                  onClick={() => {
                    reset();
                    setActiveStep(0);
                    dispatch(resetReservationForm());
                    handleClose();
                  }}
                >
                  Book a New Trip
                </p>
              </Popover>
            </div>
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
