import { GoogleMapStateProps, LocationProps, ResultsProps,VehicleProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: GoogleMapStateProps = {
    location: {
        lat: null,
        lng: null,
        address: null,
    },
    locationB: {
        lat: null,
        lng: null,
        address: null,
    },
    results: {
        serviceDetail: 'from',
        airportName: '',
        hours: 1,
        pickup: "",
        dropoff: "",
        travellers: 0,
        bags: 0,
        selectedVehicle: null,
        airline: "",
        flight: "",
        pickup_date: '',
        pickup_time: ''
    },
    checkPricing: false,
    termsConditions: false,
};

export const googleMapSlice = createSlice({
    name: 'googleMap',
    initialState,
    reducers: {
        updatePickupDate: (state, action: PayloadAction<string>) => {
            state.results.pickup_date = action.payload;
          },
      
          // Добавляем редюсер для обновления времени
          updatePickupTime: (state, action:PayloadAction<string>) => {
            state.results.pickup_time = action.payload;
          },
        resultAirline: (state,action:PayloadAction<string>)=>{
        state.results.airline = action.payload
        },
        resultFlight: (state, action:PayloadAction<string>)=>{
        state.results.flight = action.payload
        },
        chooseVehicle:(state,action:PayloadAction<VehicleProps>)=>{
        state.results.selectedVehicle = action.payload
        },
        setServiceHours: (state, action: PayloadAction<number>) => {
            state.results.hours = action.payload;
        },
        changeCheckStatus: (state, action: PayloadAction<boolean>)=>{
        state.checkPricing = action.payload
        },
        chooseServiceDetail: (state, action: PayloadAction<string>) => {
            state.results.serviceDetail = action.payload;
        },
        resultAirportName: (state,action: PayloadAction<string>)=>{
        state.results.airportName = action.payload
        },
        setLocation: (state, action: PayloadAction<LocationProps>) => {
            const { lat, lng, address } = action.payload;
            state.location = { lat, lng, address };
          },
        setLocationB: (state, action: PayloadAction<LocationProps & {lat?: number, lng?: number, address?: string}>) => {
            const { lat, lng, address, } = action.payload;
            state.locationB = { lat, lng, address };
        },
        resultDropoff: (state, action: PayloadAction<string>) => {
        state.results.dropoff = action.payload
        },
        resultPickup: (state, action: PayloadAction<string>) => {
            state.results.pickup = action.payload
        },
        serviceSelectChanged: (state)=>{
            state.results = {
                ...state.results,
                pickup: null,
            }
        },
        serviceSelectChangedB: (state)=>{
            state.results = {
                ...state.results,
                dropoff: null,
            }
        },
        clearLocation: (state) => {
            state.location = {
                lat: null,
                lng: null,
                address: null,
            }
        },
        clearLocationB: (state) => {
            state.locationB = {
                lat: null,
                lng: null,
                address: null,
            }
        },
        incrementTravellers: (state) => {
            state.results = {
                ...state.results,
                travellers: state.results.travellers + 1,
            };
        },
        decrementTravellers: (state) => {
            state.results = {
                ...state.results,
                travellers: Math.max(state.results.travellers - 1, 0),
            };
        },
        incrementBags: (state) => {
            state.results = {
                ...state.results,
                bags: state.results.bags + 1,
            };
        },
        decrementBags: (state) => {
            state.results = {
                ...state.results,
                bags: Math.max(state.results.bags - 1, 0),
            };
        },
        
    },
});

export const { chooseServiceDetail,setLocation, setLocationB, clearLocation, clearLocationB,  incrementTravellers,
    decrementTravellers,
    incrementBags,
    decrementBags,
    changeCheckStatus,
    setServiceHours,
    serviceSelectChanged,
    serviceSelectChangedB,
    chooseVehicle,
    resultAirline,
    resultFlight,
    resultAirportName,
    resultDropoff,
    resultPickup,
    updatePickupDate,
    updatePickupTime
} = googleMapSlice.actions;

export default googleMapSlice.reducer;
