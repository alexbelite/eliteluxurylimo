import { Services, airports } from "@/utils";
import { Grid, IconButton, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { addHours } from "date-fns";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FaUser } from "react-icons/fa";
import { BsSuitcaseFill } from "react-icons/bs";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { BiSolidPlaneAlt } from "react-icons/bi";
import Map from "@/components/GoogleMapFiles/GoogleMap";
import GoogleSearchBox from "./UI/GoogleSearchBox";
import { makeid } from "@/utils/CommonFunctions";
import { MdCancel } from "react-icons/md";

const TripDetails = () => {
  const { formState, control, watch, setValue } = useFormContext();
  const pickUpAddress = watch("pickUpAddress");
  const dropOffAddress = watch("dropOffAddress");
  const service = watch("service");
  const stops = watch("stops");
  const [searchBox, setSearchBox] = useState<any>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const disableFutureTimes = (time: any) => {
    return time < addHours(new Date(), 1);
  };

  useEffect(() => {
    let pickUp, dropoff;
    switch (service) {
      case "to_airport":
        pickUp = "";
        dropoff = airports[0];
        break;

      default:
        break;
    }
    setValue("pickUpAddress", pickUp, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("dropOffAddress", dropoff, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [service]);

  return (
    <div className="w-full flex flex-col md:flex-row mt-10">
      <div className="w-full md:w-1/2">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Service details</p>
                  <Select {...field}>
                    {Services.map((service, i) => (
                      <MenuItem key={i} value={service.value}>
                        {service.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="pickUpDate"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Pickup Date</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={value !== "" ? dayjs(value) : dayjs(Date.now())}
                      onChange={(date) =>
                        onChange(date ? dayjs(date) : dayjs(Date.now()))
                      }
                      disablePast
                    />
                  </LocalizationProvider>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="pickUpTime"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Pickup Time</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      disablePast
                      value={
                        value !== ""
                          ? dayjs(value)
                          : dayjs(Date.now()).add(2, "hour")
                      }
                      onChange={(time) =>
                        onChange(
                          time ? dayjs(time) : dayjs(Date.now()).add(2, "hour")
                        )
                      }
                      shouldDisableTime={disableFutureTimes}
                    />
                  </LocalizationProvider>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="passengers"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Passengers</p>
                  <Select {...field}>
                    {Array(56)
                      .fill(0)
                      .map((passenger, i) => (
                        <MenuItem key={i} value={i}>
                          <FaUser className="mr-2" />
                          {i} {i < 2 ? "passenger" : "passengers"}
                        </MenuItem>
                      ))}
                  </Select>
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
                  <Select {...field}>
                    {Array(56)
                      .fill(0)
                      .map((luggage, i) => (
                        <MenuItem key={i} value={i}>
                          <BsSuitcaseFill className="mr-2" />
                          {i} lugguage
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="pickUpAddress"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Pick Up Address</p>
                  <GoogleSearchBox
                    isLoaded={isLoaded}
                    onChange={(search) => {
                      if (search) {
                        const places = search?.getPlaces();
                        if (places.length > 0) {
                          setValue("pickUpAddress", places[0], {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }
                      }
                    }}
                    placeholder="Pickup Address"
                  />
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="flex items-center justify-between">
              <p className="font-bold mb-1">Stops</p>
              <button
                type="button"
                onClick={() => {
                  console.log("cli");
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
          {stops.map((stop: any, i: number) => (
            <Grid item xs={12} key={i}>
              <Controller
                name="stops"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center w-full [&_div]:w-[98%]">
                    <GoogleSearchBox
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
                              item.data = places[0];
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
                </div>
              )}
            />
          </Grid>
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
                </div>
              )}
            />
          </Grid>
        </Grid>
      </div>
      <div className="w-full md:w-1/2 px-6">
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
