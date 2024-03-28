"use client";
import React from "react";
import {Select, SelectItem, Input} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {resultAirportName, resultAirline,resultFlight,chooseServiceDetail, setLocation,setLocationB,serviceSelectChanged,serviceSelectChangedB } from '@/store/googleMapSlice'
import { airports } from "@/utils";

export default function SelectService() {
  const airportName = useSelector((state)=> state.map.results.airportName)
  const dispatch = useDispatch();
  const serviceDetail = useSelector((state)=> state.map.results.serviceDetail)
  const [selectedKey, setSelectedKey] = React.useState(() => [serviceDetail]);
  const [from, setFrom] = React.useState(airports[0].key)
  const results = useSelector((state)=> state.map.results)
  const [airline, setAirline] = React.useState("")
  const [flight, setFlight] = React.useState("")
  function changeServiceSelect(){
    if(serviceDetail === 'from'){
    dispatch(serviceSelectChanged())
    console.log('from', serviceDetail)
  }else if(serviceDetail === "to"){
    dispatch(serviceSelectChangedB())
    console.log('to', serviceDetail)
  }else{
    console.log('else', serviceDetail)
    dispatch(serviceSelectChanged())
    dispatch(serviceSelectChangedB())
    }
  }
  function changeFromAirport(e){
    setFrom(e.target.value)
    const selectedAirport = airports.find((airport) => airport.key === e.target.value)
    dispatch(setLocation({
      lat: selectedAirport?.lat,
      lng: selectedAirport?.lng,
      address: selectedAirport?.address,
    }));
    dispatch(resultAirportName(selectedAirport?.name))
  }
  function onAirlineEntered(e){
    setAirline(e.target.value)
dispatch(resultAirline(e.target.value))
  }
  function onFlightEntered(e){
    setFlight(e.target.value)
    dispatch(resultFlight(e.target.value))
  }
  React.useEffect(() => {
    if(serviceDetail === 'from'){
      dispatch(setLocation({
        lat: airports[0].lat,
        lng: airports[0].lng,
        address: airports[0].address,
      }));
      dispatch(resultAirportName(airports[0].name))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
React.useEffect(()=>{
  const selectedKeyArray = Array.from(selectedKey);
const key = selectedKeyArray[0];
  if (key === undefined) {
  alert('Choose Service')
} else {
  dispatch(chooseServiceDetail(key));
}
},[selectedKey,dispatch, serviceDetail])
  return (
      <>
        <div className="px-[18px] max-lg:flex-col w-full max-sm:mt-5 flex gap-2 justify-between items-center">
        <Select
        classNames={{
        label: "text-white"
        }}
        popoverProps={{
          classNames: {
            base: "before:bg-gray-500",
            content: "p-0 text-black border-small border-divider bg-background",
          },
        }}
        onChange={changeServiceSelect}
          selectedKeys={selectedKey}
          onSelectionChange={setSelectedKey}
          selectionMode="single"
        radius="none"
        label="Service Detail"
        placeholder="Select service"
          className="w-full text-white max-w-1/2"
          variant="bordered"
        >
          <SelectItem isDisabled={serviceDetail === "from" ? true : false} key="from"  value="from">From Airport</SelectItem>
          <SelectItem isDisabled={serviceDetail === "to" ? true : false} key="to"  value="to">To Airport</SelectItem>
          <SelectItem isDisabled={serviceDetail === "point" ? true : false} key="point"  value="point">Point to point</SelectItem>
          <SelectItem isDisabled={serviceDetail === "hourly" ? true : false} key="hourly"  value="hourly">Hourly</SelectItem>
      </Select>
      {
      serviceDetail === 'from' || serviceDetail === 'to' ?
      <Select
      classNames={{
        label: "text-white"
        }}
        popoverProps={{
          classNames: {
            base: "before:bg-gray-500",
            content: "p-0 text-black border-small border-divider bg-background",
          },
        }}
       className="w-full max-w-1/2"
       variant="bordered"
      radius="none"
              label={`Select ${serviceDetail} which airport`}
      placeholder="Select from which airport"
          defaultSelectedKeys={[from]}
          onChange={changeFromAirport}
    >
      {airports.map((airport) => (
        <SelectItem isDisabled={airport.name === airportName} key={airport.key} value={airport.name}>
          {airport.name}
        </SelectItem>
      ))}
    </Select>
    : <></>
      }
      </div>
     {
      serviceDetail === "from" || serviceDetail === "to" ? 
        <div className="p-4 w-full gap-2 flex max-md:flex-coll">
          <Input
            type="text"
            label="Airline"
            placeholder="airline"
            radius="none"
            value={airline}
            onChange={(e)=>onAirlineEntered(e)}
            labelPlacement="inside"
            variant="bordered"
          />
          <Input
            type="text"
            label="Flight"
            placeholder="# flight"
            radius="none"
            value={flight}
            onChange={(e)=>onFlightEntered(e)}
            labelPlacement="inside"
            variant="bordered"
          />
        </div>
       : 
        <></>
      
    }
      </>
        )
}