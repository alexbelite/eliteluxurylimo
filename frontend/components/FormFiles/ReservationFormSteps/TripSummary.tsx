import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { BsSuitcaseFill } from "react-icons/bs";
import { FaLocationDot, FaPerson } from "react-icons/fa6";
import { Controller, useFormContext } from "react-hook-form";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { ErrorMessage } from "@/components/FormFiles/ErrorMessage";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addHours } from "date-fns";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { FaAngleRight } from "react-icons/fa6";

const TripSummary = ({ handleBack }: { handleBack: () => void }) => {
  const {
    formState: { errors },
    control,
    watch,
    setValue,
    clearErrors,
    getValues,
  } = useFormContext();
  const {
    vehicle,
    service,
    pickUpDate,
    pickUpTime,
    passengers,
    luggage,
    pickUpAddress,
    dropOffAddress,
    stops,
  } = getValues();

  const returnTrip = watch("returnTrip");
  const meetGreet = watch("meetGreet");
  const returnMeetGreet = watch("returnMeetGreet");

  const disableFutureTimes = (time: any) => {
    return time < addHours(new Date(), 2);
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row mt-10">
        <div className="w-full md:w-1/2">
          <p className="font-bold text-lg">Trip Summary</p>
          <div className="flex w-full">
            <div className="w-1/2">
              <Image
                src={vehicle.image}
                width={0}
                height={0}
                className="w-[80%] h-auto"
                alt={vehicle.name}
              />
            </div>
            <div className="w-1/2">
              <p className="font-bold capitalize text-sm">
                {service.split("_").join(" ")} on{" "}
                {dayjs(pickUpDate).format("dddd, MMMM DD, YYYY")} at{" "}
                {dayjs(pickUpTime).format("hh:mm A")}
              </p>
              <p className="font-bold capitalize text-sm">
                Vehicle : {vehicle.name}
              </p>
              <div className="w-full flex flex-col text-sm space-y-1 mt-2">
                <p className="flex items-center w-full">
                  <FaUser className="mr-2" /> {passengers}
                  <BsSuitcaseFill className="mx-2" /> {luggage}
                </p>
                <p className="flex items-start w-full">
                  <FaLocationDot className="text-green-500 mr-2" />
                  {pickUpAddress.formatted_address
                    ? pickUpAddress.formatted_address
                    : pickUpAddress.address}
                </p>
                {stops.length > 0 && (
                  <>
                    {stops.map((stop: any, i: any) => (
                      <p className="flex items-start w-full" key={i}>
                        <FaLocationDot className="text-slate-300 mr-2" />
                        {stop.data.formatted_address}
                      </p>
                    ))}
                  </>
                )}
                <p className="flex items-start w-full">
                  <FaLocationDot className="text-red-500 mr-2" />
                  {dropOffAddress.formatted_address
                    ? dropOffAddress.formatted_address
                    : dropOffAddress.address}
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setValue("meetGreet", !meetGreet, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            className={`w-full p-2 border-solid border-1 mb-1 border-black shadow-inner rounded-md ${
              meetGreet ? "bg-slate-100" : ""
            }`}
          >
            Meet & Greet? {meetGreet ? "Yes" : "No"}
          </button>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="carSeats"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col mb-1">
                    <Select {...field}>
                      {Array(3)
                        .fill(0)
                        .map((seat, i) => (
                          <MenuItem key={i} value={i}>
                            <FaPerson className="mr-2" />
                            {i} {i < 1 ? "Car seat" : "Car seats"}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors.carSeats && (
                      <ErrorMessage>{errors.carSeats?.message}</ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <button
            type="button"
            onClick={() => {
              setValue("returnTrip", !returnTrip, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            className={`w-full p-2 border-solid border-1 mb-4 border-black shadow-inner rounded-md ${
              returnTrip ? "bg-slate-100" : ""
            }`}
          >
            Book Return Trip? {returnTrip ? "Yes" : "No"}
          </button>
          {returnTrip && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="returnPickUpDate"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <div className="flex flex-col">
                      <p className="font-bold mb-1">Return Pickup Date</p>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={
                            value !== "" ? dayjs(value) : dayjs(Date.now())
                          }
                          onChange={(date) =>
                            onChange(
                              date
                                ? dayjs(date).utc(true).format()
                                : dayjs(Date.now()).utc(true).format()
                            )
                          }
                          disablePast
                        />
                      </LocalizationProvider>
                      {errors.returnPickUpDate && (
                        <ErrorMessage>
                          {errors.returnPickUpDate?.message}
                        </ErrorMessage>
                      )}
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="returnPickUpTime"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex flex-col">
                      <p className="font-bold mb-1">Return Pickup Time</p>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker
                          disablePast
                          value={
                            value !== ""
                              ? dayjs(value)
                              : dayjs(Date.now()).add(3, "hour")
                          }
                          onChange={(time) =>
                            onChange(
                              time
                                ? dayjs(time).utc(true).format()
                                : dayjs(Date.now())
                                    .add(3, "hour")
                                    .utc(true)
                                    .format()
                            )
                          }
                          shouldDisableTime={disableFutureTimes}
                        />
                      </LocalizationProvider>
                      {errors.returnPickUpTime && (
                        <ErrorMessage>
                          {errors.returnPickUpTime?.message}
                        </ErrorMessage>
                      )}
                    </div>
                  )}
                />
              </Grid>
              {["to_airport", "from_airport"].includes(service) && (
                <>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="returnAirline"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col">
                          <p className="font-bold mb-1">Airline</p>
                          <TextField
                            sx={{
                              "& input": {
                                textAlign: "start!important",
                              },
                            }}
                            placeholder="Airline"
                            {...field}
                          />
                          {errors.returnAirline && (
                            <ErrorMessage>
                              {errors.returnAirline?.message}
                            </ErrorMessage>
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="returnFlightNo"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col">
                          <p className="font-bold mb-1">Flight #</p>
                          <TextField
                            sx={{
                              "& input": {
                                textAlign: "start!important",
                              },
                            }}
                            placeholder="(eg :123)"
                            {...field}
                          />
                          {errors.returnFlightNo && (
                            <ErrorMessage>
                              {errors.returnFlightNo?.message}
                            </ErrorMessage>
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <button
                  type="button"
                  onClick={() => {
                    setValue("returnMeetGreet", !returnMeetGreet, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  className={`w-full p-2 border-solid border-1 mb-1 border-black shadow-inner rounded-md ${
                    returnMeetGreet ? "bg-slate-100" : ""
                  }`}
                >
                  Meet & Greet? {returnMeetGreet ? "Yes" : "No"}
                </button>
              </Grid>
            </Grid>
          )}
        </div>
        <div className="w-full md:w-1/2 p-6">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="specialRequests"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Special Requests</p>
                    <TextField
                      sx={{
                        "& input": {
                          textAlign: "start!important",
                        },
                      }}
                      placeholder="(Enter any specialized instructions or request here)"
                      {...field}
                    />
                    {errors.specialRequests && (
                      <ErrorMessage>
                        {errors.specialRequests?.message}
                      </ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <p className="font-bold text-lg">Personal Info</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">First Name</p>
                    <TextField
                      sx={{
                        "& input": {
                          textAlign: "start!important",
                        },
                      }}
                      placeholder="First Name"
                      {...field}
                    />
                    {errors.firstName && (
                      <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Last Name</p>
                    <TextField
                      sx={{
                        "& input": {
                          textAlign: "start!important",
                        },
                      }}
                      placeholder="Last Name"
                      {...field}
                    />
                    {errors.lastName && (
                      <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Email</p>
                    <TextField
                      sx={{
                        "& input": {
                          textAlign: "start!important",
                        },
                      }}
                      placeholder="Email Address"
                      {...field}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Phone</p>
                    <TextField
                      sx={{
                        "& input": {
                          textAlign: "start!important",
                        },
                      }}
                      InputProps={{
                        type: "tel",
                      }}
                      placeholder="phone"
                      {...field}
                    />
                    {errors.phone && (
                      <ErrorMessage>{errors.phone?.message}</ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <button
          type="button"
          onClick={handleBack}
          className="bg-[#337ab7] text-white p-2 px-10 rounded-md flex w-fit mt-10"
        >
          <TiArrowBack className="mr-2 text-2xl" />
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 px-10 rounded-md w-fit mt-10 flex items-center"
        >
          Request Quote
          <FaAngleRight className="ml-1 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TripSummary;
