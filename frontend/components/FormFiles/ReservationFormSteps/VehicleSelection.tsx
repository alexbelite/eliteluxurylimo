// React Imports
import React from "react";

// Next Imports
import Image from "next/image";

// UI Imports
import { Grid } from "@mui/material";

// Third part Imports
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";

// Utils Imports
import { calculateCharge } from "@/utils/CommonFunctions";
import { VehiclesData } from "@/utils";

// Icon imports
import { TiArrowBack } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { BsSuitcaseFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";

const VehicleSelection = ({
  handleBack,
  handleNext,
}: {
  handleBack: () => void;
  handleNext: () => void;
}) => {
  const directionsData = useSelector(
    (state: any) => state.reservationForm.directionsData
  );
  const {
    formState: { errors },
    control,
    watch,
    setValue,
    clearErrors,
  } = useFormContext();
  const service = watch("service");
  const passengers = watch("passengers");
  const hours = watch("hours");
  return (
    <div className="w-full flex flex-col mt-10">
      <Grid container spacing={6}>
        {VehiclesData.map((vehicle, i) => {
          const price = calculateCharge(directionsData, vehicle.type);
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={i}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <p className="text-lg mb-2">{vehicle.name}</p>
              <div className="h-[150px] flex items-center justify-center">
                <Image
                  src={vehicle.image}
                  width={160}
                  height={80}
                  alt={vehicle.name}
                />
              </div>
              <div className="flex mt-2">
                <p className="flex mr-2">
                  <FaUser className="mr-1 text-xl" /> {vehicle.passengers}
                </p>

                {vehicle.luggage > 0 && (
                  <>
                    -
                    <p className="flex ml-2">
                      <BsSuitcaseFill className="mr-1 text-xl" />{" "}
                      {vehicle.luggage}
                    </p>
                  </>
                )}
                {service === "hourly_charter" && hours < 2 && (
                  <div className="flex ml-1 items-center">
                    - <FiClock className="mx-2" /> Min Hrs : 2
                  </div>
                )}
              </div>
              {service === "hourly_charter" && hours < 2 ? (
                <p className="bg-yellow-400 text-white rounded-md p-1 text-xs mt-2">
                  Pricing Reflects a minimum of 2 Hours to be booked
                </p>
              ) : (
                <>
                  {!vehicle.isQuote && price !== "quote" && (
                    <p className="my-3">{price}</p>
                  )}
                  {(vehicle.isQuote || price === "quote") && (
                    <>
                      {passengers > vehicle.passengers &&
                      vehicle.type === "sedan" ? (
                        <p className="my-3 text-sm font-semibold text-red-800">
                          Please choose larger vehicle
                        </p>
                      ) : (
                        <>
                          <p className="my-3 text-md font-semibold text-slate-200">
                            Request a quote
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setValue("vehicle", vehicle, {
                                shouldDirty: true,
                                shouldValidate: true,
                              });
                              handleNext();
                            }}
                            className="bg-yellow-600 w-1/2 p-1 mt-2 border-solid border-1 border-black"
                          >
                            {vehicle.isQuote || price === "quote"
                              ? "Quote"
                              : "Reserve"}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </Grid>
          );
        })}
      </Grid>
      <button
        onClick={handleBack}
        type="button"
        className="bg-[#337ab7] text-white p-2 px-10 rounded-md flex w-fit mt-10"
      >
        <TiArrowBack className="mr-2 text-2xl" />
        Back
      </button>
    </div>
  );
};

export default VehicleSelection;
