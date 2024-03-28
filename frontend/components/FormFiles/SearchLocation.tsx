"use client";
import React from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch, useSelector } from "react-redux";
import {resultDropoff,resultPickup, setLocation,setLocationB,clearLocation,clearLocationB, setServiceHours,changeCheckStatus} from "@/store/googleMapSlice";
import { RootState } from "@/types";
import {Input} from "@nextui-org/react";
import { airports } from '@/utils';
export default function SearchLocation() {
  const dispatch = useDispatch();
  const checkStatus = useSelector((state: RootState)=> state.map.checkPricing)
  const airportName = useSelector((state: RootState)=> state.map.results.airportName)
  const serviceDetail = useSelector((state: RootState)=> state.map.results.serviceDetail)
  const serviceHours = useSelector((state: RootState)=> state.map.results.hours)
  const loca = useSelector((state: RootState) => state.map.results.pickup);
  const locaB = useSelector((state: RootState) => state.map.results.dropoff);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'us' },
    },
    debounce: 300,
  });

  const {
    value: valueB,
    suggestions: { status: statusB, data: dataB },
    setValue: setValueB,
    clearSuggestions: clearSuggestionsB,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'us' },
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
    clearSuggestionsB();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCheckStatus(false))
    setValue(e.target.value || '');
  };

  const handleInputB = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCheckStatus(false))
    setValueB(e.target.value || '');
  };
  const handleSelect = ({ description }: { description: string }) => () => {
    setValue(description, false);
    clearSuggestions();
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      const formatted_address = results[0]?.formatted_address || '';
      dispatch(setLocation({ lat, lng, address: formatted_address}));
      dispatch(resultPickup(formatted_address))
      if (serviceDetail === "to") {
        const pointB = airports.find(airport => airport.name === airportName)
        if (pointB) {
          console.log('POINTB', pointB)
          dispatch(setLocationB({lat: pointB.lat, lng: pointB.lng, address: pointB.address}))
        }
      }
    });
  };

  const handleSelectB = ({ description }: { description: string }) => () => {
    setValueB(description, false);
    clearSuggestionsB();

    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      const formatted_address = results[0]?.formatted_address || '';
      dispatch(setLocationB({ lat, lng, address: formatted_address }));
      dispatch(resultDropoff(formatted_address))
    });
  };

  function clearInput() {
     setValue('')
     dispatch(clearLocation())
  }
  function clearInputB() {
    setValueB('')
    dispatch(clearLocationB())
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="bg-blue-500 my-2 cursor-pointer text-black"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  const renderSuggestionsB = () =>
    dataB.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="bg-blue-500 my-2 cursor-pointer text-black"
          key={place_id}
          onClick={handleSelectB(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
    const [hours, setHoursLocal] = React.useState<number | string>(
      serviceHours !== null && serviceHours !== undefined ? serviceHours.toString() : ""
    );

    React.useEffect(() => {
      if (hours !== null && hours !== undefined && !isNaN(Number(hours))) {
        dispatch(setServiceHours(Number(hours)));
      }
    }, [hours, dispatch]);
  return (
    <>
    {
    serviceDetail === "hourly" ?
    <div className="p-4 w-full">
      <Input
          type="number"
          label="Hours"
          placeholder="0"
          radius="none"
          value={hours.toString()}
          onValueChange={(value: string) => setHoursLocal(value)}
          labelPlacement="inside"
          variant="bordered"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">Hour</span>
            </div>
          }
        />
      </div>
      : <></>
    }
    <div ref={ref} className="p-4 w-full  flex justify-between items-start gap-3 max-sm:flex-col">
      {
      serviceDetail === 'from' ? <></> :
      <div className={`${serviceDetail === 'from' || serviceDetail === 'hourly' ? "w-1/2" : "w-full"} max-sm:w-full relative`}>
      <Input
      isRequired
      isInvalid={checkStatus}
      errorMessage={checkStatus && "Please enter the address"}
      color={loca === "" ? "danger" : "default"}
        type="text"
        variant="bordered"
          label="Pick-up address"
          radius='none'
        isClearable
        value={value || ''}
        onChange={handleInput}
        onClear={() => clearInput()}
        disabled={!ready}
        placeholder="Enter pickup address"
      />
      {status === 'OK' && <ul className="bg-white absolute z-10">{renderSuggestions()}</ul>}
    </div>
      }
      {
      serviceDetail === 'to'? <></> :
<div className={`${serviceDetail === 'to' || serviceDetail === 'hourly' ? "w-1/2" : "w-full"} relative max-sm:w-full`}>
        <Input
        color={locaB === "" ? "danger" : "default"}
        isRequired
        isInvalid={checkStatus}
        errorMessage={checkStatus && "Please enter the address"}
        radius='none'
        type="text"
        onClear={() => clearInputB()}
        variant="bordered"
        label="Drop-off address"
        isClearable
        value={valueB ||''}
        onChange={handleInputB}
        disabled={!ready}
        placeholder="Enter drop-off address"
      />
      {statusB === 'OK' && <ul className="bg-white absolute z-10">{renderSuggestionsB()}</ul>}
</div>
    }
    </div>
    </>
  );
};