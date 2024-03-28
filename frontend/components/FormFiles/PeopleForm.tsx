"use client";
import React, { FormEvent, useRef } from 'react';
import { RootState,VehicleProps } from '@/types';
import { MinusIcon, PlusIcon } from './../icons/';
import { useSelector, useDispatch } from 'react-redux';
import {chooseVehicle, incrementTravellers, decrementTravellers, incrementBags, decrementBags, clearLocation, clearLocationB,changeCheckStatus } from '@/store/googleMapSlice'
import {Chip,Link,Checkbox,Input,ButtonGroup,Card, CardFooter, Image,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { vehicles } from '@/utils';
import { CldImage } from 'next-cloudinary';
import {airports} from '@/utils'
import { sendEmailJs } from '@/actions/emailjs';
export default function PeopleForm(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isSelected, setIsSelected] = React.useState(false);
    const [emailSent,setEmailSent] = React.useState(false)
const travellers = useSelector((state: RootState)=> state.map.results.travellers)
const bags = useSelector((state: RootState) => state.map.results.bags)
const res = useSelector((state: RootState)=> state.map.results) 
const reduxVehicle = useSelector((state: RootState)=> state.map.results.selectedVehicle)
const findAddress = airports.find((airport)=> airport.name === res.airportName)
const dispatch = useDispatch();
function onVehicleSelected(vehicle : VehicleProps){
  dispatch(chooseVehicle(vehicle))
  setVehicleSelected(true)
}
function onCanceled(){
  setVehicleSelected(false)
  dispatch(clearLocation())
  dispatch(clearLocationB())
  }

const handleTravellersIncrement = () => {
  dispatch(incrementTravellers());
};

const handleTravellersDecrement = () => {
  dispatch(decrementTravellers());
};

const handleBagsIncrement = () => {
  dispatch(incrementBags());
};

const handleBagsDecrement = () => {
  dispatch(decrementBags());
};
type ScrollBehavior = "normal" | "inside" | "outside";
const [scrollBehavior, setScrollBehavior] = React.useState<ScrollBehavior>('normal');
const [requestSent, setRequestSent] = React.useState(false)
React.useEffect(() => {
  const handleResize = () => {
    const newScrollBehavior = window.innerWidth <= 540 ? 'inside' : 'normal';
    setScrollBehavior(newScrollBehavior);
  };
  
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [vehicleSelected, setVehicleSelected] = React.useState(false)
  const CheckPricing = () => {
    if (res.dropoff  === null){
      console.log('NULL')
   dispatch(changeCheckStatus(true))
    }else{
      onOpen()
    }
  }

  const sendResult = useSelector((state: RootState)=> state.map.results)
  const airportAddress = useSelector((state: RootState)=> state.map.location.address)
  const airportAddressB = useSelector((state: RootState)=> state.map.locationB.address)
  async function onSubmit(data: FormData) {
    console.log(airportAddress)
    const combinedData = {
      ...Object.fromEntries(data),
      serviceDetail: sendResult.serviceDetail ,
      airportName: sendResult.airportName || '' ,
      airportAddress: airportAddress ,
      airportAddressB:airportAddressB ,
      hours: sendResult.hours,
      pickup: sendResult.pickup ,
      dropoff: sendResult.dropoff  ,
      travellers: sendResult.travellers || '' ,
      bags: sendResult.bags || '' ,
      selectedVehicle: sendResult?.selectedVehicle?.name || '' ,
      airline: sendResult.airline || '' ,
      flight: sendResult.flight || '' ,
      pickup_date: sendResult.pickup_date,
      pickup_time: sendResult.pickup_time
    };
      await sendEmailJs(combinedData)
      setRequestSent(true)
  }
  return(
    <>
    <div className='flex flex-col gap-3 h-auto mb-10'>
    <section className='flex gap-3 flex-wrap h-auto '>
        <div className="max-lg:items-start flex-1 flex flex-col gap-3">
            <span>Passengers</span>
            <ButtonGroup radius="none" size="md" className="flex justify-stretch items-stretch w-full">
      <Button onClick={handleTravellersDecrement} isIconOnly><MinusIcon /></Button>
      <Button className="font-semibold leading-7 text-lg" isDisabled isIconOnly>{travellers}</Button>
      <Button onClick={handleTravellersIncrement} isIconOnly><PlusIcon /></Button>
    </ButtonGroup>
        </div>
        <div className="max-lg:items-start flex-1  flex flex-col gap-3">
            <span>Luggage</span>
            <ButtonGroup size="md" radius="none" className="flex justify-stretch items-stretch w-full">
      <Button onClick={handleBagsDecrement} isIconOnly><MinusIcon /></Button>
      <Button className="font-semibold leading-7 text-lg" isDisabled isIconOnly>{bags}</Button>
      <Button onClick={handleBagsIncrement} isIconOnly><PlusIcon /></Button>
    </ButtonGroup>
        </div>
    </section>
        <Button onPress={CheckPricing} className="bg-black lg:w-full  text-white mr-auto px-8" radius="none">
        Check Pricing
    </Button>   
</div>
 <Modal className="dark"  scrollBehavior={scrollBehavior} size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Choose Vehicle Type</ModalHeader>
              <ModalBody className="h-auto py-6 grid grid-rows-auto overflow-auto  sm:grid-rows-1 sm:grid-cols-4 gap-3">
                
                {vehicleSelected === false?
                vehicles.map((el,index)=>(
                  <div className="col-span-1" key={index} onClick={()=> onVehicleSelected(el)} >
                    <Card isFooterBlurred className="relative hover:drop-shadow-xl w-full h-[300px]">
                      <CldImage
                        fill
                      alt="alexlimo"
                        src={el?.image}
                      className="object-contain object-center"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                      <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                                    <p className="text-tiny text-white">{el.name}</p>
                          <p className="text-tiny text-white">Passengers: {el.passengers} - Bags: {el.bags}</p>
                        </div>
                      </div>
                      <Button radius="full" size="sm">Request a Quote</Button>
                    </CardFooter>
                  </Card>
                  </div>
                    ))
                : (
                <section className=" col-span-full w-full gap-2 container max-sm:flex-col flex justify-between items-center">
                  <div className="max-sm:w-full w-1/2 h-full">
                    <div className="flex flex-col items-start ">
                      <p className="text-large">Trip Summary</p>
                    </div>
                    <div className="w-full">
                      <div className="w-full h-full">  
                        <Image className="w-2/5 h-full" src={reduxVehicle?.image} alt="alex limo"/>
                      <div>
                        {res?.serviceDetail === 'from' && <p>Pick-up From {res?.airportName}</p>}
                        {res?.serviceDetail === 'to' && <p>Drop-off to {res?.airportName}</p>}
                        {['from', 'to'].includes(res?.serviceDetail) && <p>Airport address: {findAddress?.address}</p>}
                        {res?.serviceDetail === 'from' && <p>Drop-off To {res?.dropoff}</p>}
                        {res?.serviceDetail === 'to' && <p>Pick-up from {res?.pickup}</p>}
                        {(res?.serviceDetail === 'point' || res?.serviceDetail === 'hourly') && <p>Pick-up From {res?.pickup}</p>}
                        {(res?.serviceDetail === 'point' || res?.serviceDetail === 'hourly') && <p>Drop-off To {res?.dropoff}</p>}
                        {res?.serviceDetail === 'hourly' && <p>Hours: {res.hours}</p>}
                        {res?.serviceDetail === 'from' || res?.serviceDetail === 'to'?  <p>Airline: {res.airline}</p> : null}
                        {res?.serviceDetail === 'from' || res?.serviceDetail === 'to'?  <p>Flight: {res.flight}</p> : null}
                        <p>Passengers: {res.travellers}</p>
                        <p>Luggage: {res.bags}</p>
                      </div>
                   </div>
                        </div>
                  </div>
                  <div className="max-sm:w-full w-1/2 h-full">
                <div className="w-full h-full">
      <div className="flex flex-col items-start ">
        <p className="text-large">Personal Info</p>
      </div>
      {
      requestSent ? (
        <Chip color="success">Request has been sent!</Chip>
        )
        : (     
                          <form action={onSubmit}>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input name="username" label="Username" labelPlacement="outside" placeholder="Enter username" />
        <Input name="email" label="Email" labelPlacement="outside" placeholder="Enter email" />
        <Input name="first_name" label="First Name" labelPlacement="outside" placeholder="Enter first name" />
        <Input name="last_name" label="Last Name" labelPlacement="outside" placeholder="Enter last name" />
        <Input name="phone" label="Phone Number" labelPlacement="outside" placeholder="Enter phone number" />
        <Input name="promocode" label="Promode code (optional)" labelPlacement="outside" placeholder="Enter promocode" />
                            </div>
                  <div className="mt-2">
                    <p className="text-xs">By checking this box you agree to our <Link showAnchorIcon isExternal underline="always" href="/terms-conditions">Terms & Conditions</Link></p>
                          <Checkbox isRequired isSelected={isSelected} onValueChange={setIsSelected}></Checkbox>
                            </div>
                          <button className="bg-white rounded-sm text-black px-3 py-2" type="submit">Request a Quote</button>
      </form>
          )
      }
    </div> 
                  </div>
    </section>
    )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={ vehicleSelected === false ? onClose : onCanceled}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
</>
    )
}