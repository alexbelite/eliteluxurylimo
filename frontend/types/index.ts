import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export type NavlinksProps = {
  id: number;
  label: string;
  href: string;
  section?: string;
};

export interface LocationClickedEvent {
  latLng: {
    lat: () => number;
    lng: () => number;
  };
}
export interface LocationProps {
  lat: number | null;
  lng: number | null;
  address?: string | null;
}
export interface ResultsProps {
  airportName: string;
  serviceDetail: string;
  hours?: number;
  pickup: string | null;
  dropoff: string | null | undefined;
  travellers: number;
  bags: number;
  selectedVehicle?: VehicleProps | null;
  airline: string;
  flight: string;
  pickup_date: string;
  pickup_time: string;
}
export interface GoogleMapStateProps {
  location: LocationProps;
  locationB: LocationProps;
  results: ResultsProps;
  checkPricing: boolean;
  termsConditions: boolean;
}
export interface RootState {
  map: GoogleMapStateProps;
}
export interface DirectionsResponse {
  status: string;
  geocoded_waypoints: any[];
  routes: google.maps.DirectionsRoute[];
}
export interface VehicleProps {
  image: string;
  name: string;
  passengers: number;
  bags: number;
  price: number;
}
export interface BlogCardsProps {
  id: string;
  image: string;
  label: string;
  description: string;
}

export interface AiportProps {
  key: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}
export interface ReviewProps {
  rating: number;
  image: string;
  label: string;
  description: string;
}
export interface FormProps {
  to_name: "Alex Limo";
  from_name: string;
  from_airport: string;
  from_airport_address: string;
  to_airport: string;
  pickup_address: string;
  dropoff_address: string;
  pickup_date: string;
  hours: number;
  passengers: number;
  bags: number;
  airline: string;
  flight: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  vehicle: string;
  notes: string;
  reply_to: string;
}

export interface CreateAccountWithUsProps {
  name: string;
  business_name: string;
  email: string;
  phone: string;
  rides: string;
  notes?: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface UserProps {
  [key: string]: string;
}

export interface EditProfileProps {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  [key: string]: string;
}
