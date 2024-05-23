// React Imports
import React from "react";

// UI Imports
import { Grid, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers";

// UI Components Imports
import Map from "@/components/GoogleMapFiles/GoogleMap";
import GoogleSearchBox from "./UI/GoogleSearchBox";
import { ErrorMessage } from "@/components/FormFiles/ErrorMessage";

// Third part Imports
import moment from "moment-timezone";
import { useJsApiLoader } from "@react-google-maps/api";

// Utils imports
import { GOOGLE_MAPS_LIBRARIES, Services, airports } from "@/utils";
import { makeid } from "@/utils/CommonFunctions";

// Icon imports
import { FaUser } from "react-icons/fa";
import { BsSuitcaseFill } from "react-icons/bs";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

// Redux Imports
import { useAppDispatch } from "@/store/hooks";
import { setDirectionsData } from "@/store/ReservationFormSlice";

// Set the time zone to Chicago
moment.tz.setDefault("America/Chicago");

const TripDetails = ({
  handleNext,
  initialRender,
}: {
  handleNext: () => void;
  initialRender: boolean;
}) => {
  const {
    formState: { errors },
    control,
    watch,
    setValue,
    clearErrors,
  } = useFormContext();
  const dispatch = useAppDispatch();
  const pickUpAddress = watch("pickUpAddress");
  const dropOffAddress = watch("dropOffAddress");
  const service = watch("service");
  const stops = watch("stops");
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const serviceChangeHandler = (serviceType: string) => {
    let pickUp, dropoff;
    switch (serviceType) {
      case "to_airport":
        pickUp = null;
        dropoff = airports[0];
        break;
      case "from_airport":
        pickUp = airports[0];
        dropoff = null;
        break;
      case "point_to_point":
        pickUp = null;
        dropoff = null;
        break;
      case "hourly_charter":
        pickUp = null;
        dropoff = null;
        break;

      default:
        break;
    }
    setValue("pickUpAddress", pickUp);
    setValue("dropOffAddress", dropoff);
    clearErrors();
    dispatch(setDirectionsData(null));
  };

  return (
    <div className="w-full flex flex-col md:flex-row mt-10">
      <div className="w-full md:w-1/2">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="service"
              control={control}
              render={({ field: { onChange, ...restField } }) => (
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Service details</p>
                  <Select
                    onChange={(e) => {
                      onChange(e);
                      serviceChangeHandler(e.target.value);
                    }}
                    {...restField}
                  >
                    {Services.map((service, i) => (
                      <MenuItem key={i} value={service.value}>
                        {service.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.service && (
                    <ErrorMessage>{errors?.service?.message}</ErrorMessage>
                  )}
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="pickUpDate"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Pickup Date</p>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        timezone="America/Chicago"
                        value={moment(value)}
                        onChange={(date) => {
                          onChange(moment(date).format());
                          const time = `${moment(date).format("YYYY-MM-DD")}T${
                            watch("pickUpTime").split("T")[1]
                          }`;
                          setValue("pickUpTime", time, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                        disablePast
                      />
                    </LocalizationProvider>
                    {errors.pickUpDate && (
                      <ErrorMessage>{errors.pickUpDate?.message}</ErrorMessage>
                    )}
                  </div>
                );
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="pickUpTime"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Pickup Time</p>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <MobileTimePicker
                        timezone="America/Chicago"
                        value={moment(value)}
                        onChange={(time: any) =>
                          onChange(moment(time).format())
                        }
                      />
                    </LocalizationProvider>
                    {errors.pickUpTime && (
                      <ErrorMessage>{errors.pickUpTime?.message}</ErrorMessage>
                    )}
                  </div>
                );
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="passengers"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Passengers</p>
                  <Select
                    {...field}
                    MenuProps={{
                      sx: {
                        maxHeight: "300px",
                      },
                    }}
                  >
                    {Array(56)
                      .fill(0)
                      .map((passenger, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          <FaUser className="mr-2" />
                          {i + 1} {i < 1 ? "passenger" : "passengers"}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.passengers && (
                    <ErrorMessage>{errors.passengers?.message}</ErrorMessage>
                  )}
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="luggage"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Luggage</p>
                  <Select
                    {...field}
                    MenuProps={{
                      sx: {
                        maxHeight: "300px",
                      },
                    }}
                  >
                    {Array(57)
                      .fill(0)
                      .map((luggage, i) => (
                        <MenuItem key={i} value={i}>
                          <BsSuitcaseFill className="mr-2" />
                          {i} lugguage
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.luggage && (
                    <ErrorMessage>{errors.luggage?.message}</ErrorMessage>
                  )}
                </div>
              )}
            />
          </Grid>
          {service === "hourly_charter" && (
            <Grid item xs={12}>
              <Controller
                name="hours"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Hours</p>
                    <Select
                      {...field}
                      MenuProps={{
                        sx: {
                          maxHeight: "300px",
                        },
                      }}
                    >
                      {Array(57)
                        .fill(0)
                        .map((hour, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {i + 1} {i < 1 ? "hour" : "hours"}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors.hours && (
                      <ErrorMessage>{errors.hours?.message}</ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
          )}
          {["to_airport", "point_to_point", "hourly_charter"].includes(
            service
          ) && (
            <Grid item xs={12}>
              <Controller
                name="pickUpAddress"
                control={control}
                render={({ field: { value } }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Pick Up Address</p>
                    <GoogleSearchBox
                      defaultValue={
                        value?.formatted_address ? value?.formatted_address : ""
                      }
                      isLoaded={isLoaded}
                      onChange={(search) => {
                        if (search) {
                          const places = search?.getPlaces();
                          if (places.length > 0) {
                            setValue(
                              "pickUpAddress",
                              {
                                geometry: places[0].geometry,
                                formatted_address: places[0].formatted_address,
                              },
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }
                        }
                      }}
                      placeholder="Pickup Address"
                    />
                    {errors.pickUpAddress && (
                      <ErrorMessage>
                        {errors.pickUpAddress?.message}
                      </ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
          )}
          {service === "from_airport" && (
            <Grid item xs={12}>
              <Controller
                name="pickUpAddress"
                control={control}
                render={({ field: { value, onChange, ...restField } }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Pick Up Airport</p>
                    <Select
                      value={value ? value?.key : airports[0].key}
                      onChange={(e) => {
                        onChange(
                          airports.filter((el) => el.key === e.target.value)[0]
                        );
                      }}
                      {...restField}
                    >
                      {airports.map((airport, i) => (
                        <MenuItem key={airport.key} value={airport.key}>
                          <BiSolidPlaneAlt className="mr-2" />
                          {airport.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.pickUpAddress && (
                      <ErrorMessage>
                        {errors.pickUpAddress?.message}
                      </ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
          )}
          {service !== "hourly_charter" && (
            <>
              <Grid item xs={12}>
                <div className="flex items-center justify-between">
                  <p className="font-bold mb-1">Stops</p>
                  <button
                    type="button"
                    onClick={() => {
                      const newStop = { id: makeid(5), data: null };
                      setValue("stops", [...stops, newStop], {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                    className="bg-[#337ab7] text-sm text-white p-1 px-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              </Grid>
              {stops.length > 0 &&
                stops.map((stop: any, i: number) => (
                  <Grid item xs={12} key={i}>
                    <Controller
                      name="stops"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center w-full [&_div]:w-[98%]">
                          <GoogleSearchBox
                            defaultValue={
                              stop && stop.data?.formatted_address
                                ? stop.data?.formatted_address
                                : ""
                            }
                            isLoaded={isLoaded}
                            onChange={(search) => {
                              if (search) {
                                const places = search?.getPlaces();
                                if (places.length > 0) {
                                  const updatedStops = stops;
                                  const itemIndex = updatedStops.findIndex(
                                    (el: any) => el.id === stop.id
                                  );
                                  if (itemIndex > -1) {
                                    const item = updatedStops[itemIndex];
                                    item.data = {
                                      geometry: places[0].geometry,
                                      formatted_address:
                                        places[0].formatted_address,
                                    };
                                    updatedStops[itemIndex] = item;
                                  }
                                  setValue("stops", updatedStops, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  });
                                }
                              }
                            }}
                            placeholder={`Stop ${i + 1}`}
                            className="w-full"
                          />
                          <IconButton
                            type="button"
                            onClick={() => {
                              const updatedStops = stops.filter(
                                (el: any) => el.id !== stop.id
                              );
                              setValue("stops", updatedStops, {
                                shouldDirty: true,
                                shouldValidate: true,
                              });
                            }}
                          >
                            <MdCancel className="text-2xl text-red-500" />
                          </IconButton>
                        </div>
                      )}
                    />
                  </Grid>
                ))}
            </>
          )}
          {service === "to_airport" && (
            <Grid item xs={12}>
              <Controller
                name="dropOffAddress"
                control={control}
                render={({ field: { value, onChange, ...restField } }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Dropoff Airport</p>
                    <Select
                      value={value ? value?.key : airports[0].key}
                      onChange={(e) => {
                        onChange(
                          airports.filter((el) => el.key === e.target.value)[0]
                        );
                      }}
                      {...restField}
                    >
                      {airports.map((airport, i) => (
                        <MenuItem key={airport.key} value={airport.key}>
                          <BiSolidPlaneAlt className="mr-2" />
                          {airport.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.dropOffAddress && (
                      <ErrorMessage>
                        {errors.dropOffAddress?.message}
                      </ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
          )}
          {["from_airport", "point_to_point", "hourly_charter"].includes(
            service
          ) && (
            <Grid item xs={12}>
              <Controller
                name="dropOffAddress"
                control={control}
                render={({ field: { value } }) => (
                  <div className="flex flex-col">
                    <p className="font-bold mb-1">Drop Off Address</p>
                    <GoogleSearchBox
                      defaultValue={
                        value?.formatted_address ? value?.formatted_address : ""
                      }
                      isLoaded={isLoaded}
                      onChange={(search) => {
                        if (search) {
                          const places = search?.getPlaces();
                          if (places.length > 0) {
                            setValue(
                              "dropOffAddress",
                              {
                                geometry: places[0].geometry,
                                formatted_address: places[0].formatted_address,
                              },
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }
                        }
                      }}
                      placeholder="Dropoff Address"
                    />
                    {errors.dropOffAddress && (
                      <ErrorMessage>
                        {errors.dropOffAddress?.message}
                      </ErrorMessage>
                    )}
                  </div>
                )}
              />
            </Grid>
          )}
          {["to_airport", "from_airport"].includes(service) && (
            <>
              <Grid item xs={12} md={6}>
                <Controller
                  name="airline"
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
                      {errors.airline && (
                        <ErrorMessage>{errors.airline?.message}</ErrorMessage>
                      )}
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="flightNo"
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
                      {errors.flightNo && (
                        <ErrorMessage>{errors.flightNo?.message}</ErrorMessage>
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
              onClick={handleNext}
              className="w-full p-2 bg-green-500 rounded-md text-white"
            >
              Check Pricing
            </button>
          </Grid>
        </Grid>
      </div>
      <div className="w-full min-h-[500px] relative mt-6 md:mt-0 md:w-1/2 px-6">
        <Map
          isLoaded={isLoaded}
          startLocation={pickUpAddress}
          endLocation={dropOffAddress}
          stops={stops}
        />
      </div>
    </div>
  );
};

export default TripDetails;
