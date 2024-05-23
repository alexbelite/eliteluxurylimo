import { NavlinksProps, AiportProps, ReviewProps } from "@/types";

import image1 from "@/public/image_1.png";
import image2 from "@/public/image_2.png";
import image3 from "@/public/purplegirl.png";

// Maps Library constants
export const GOOGLE_MAPS_LIBRARIES: any = ["places"];

export const navlinks: NavlinksProps[] = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Reservation", href: "/reservation" },
  { id: 3, label: "Services", href: "/", section: "services" },
  { id: 4, label: "Corporations", href: "/corporations" },
  { id: 5, label: "Contact Us", href: "/contact-us" },
];

export const images: any[] = [image1, image2, image3];
const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
export const VehiclesData = [
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=1479782",
    name: "Sedan",
    type: "sedan",
    passengers: 2,
    luggage: 3,
    minHours: 2,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=2450684",
    name: "SUV",
    type: "suv",
    passengers: 6,
    luggage: 6,
    minHours: 2,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=1582303",
    name: "Mercedes S/BMW 7/Audi A8",
    type: "luxury_sedan",
    passengers: 2,
    luggage: 3,
    minHours: 3,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=2670745",
    name: "Executive Sprinter Van",
    type: "van",
    passengers: 13,
    luggage: 13,
    minHours: 3,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=2679526",
    name: "Black Lincoln MKT Stretch",
    type: "limo",
    passengers: 8,
    luggage: 1,
    minHours: 4,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=1995312",
    name: "22 Passenger Minibus",
    type: "minibus",
    passengers: 22,
    luggage: 22,
    minHours: 5,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=2702915",
    name: "28 Passenger Minibus",
    type: "minibus",
    passengers: 28,
    luggage: 28,
    minHours: 5,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=750878",
    name: "38 Passenger Minibus",
    type: "minibus",
    passengers: 38,
    luggage: 38,
    minHours: 5,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=1224734",
    name: "Motor Coach",
    type: "coach",
    passengers: 56,
    luggage: 56,
    minHours: 5,
    isQuote: true,
  },
  {
    image: "https://bookridesonline.com/Web/ImageHandler.ashx?id=1995312",
    name: "Party Bus",
    type: "party_bus",
    passengers: 16,
    luggage: 0,
    minHours: 4,
    isQuote: true,
  },
];

export const vehicles: any[] = [
  {
    image:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710473579/alexlimoimg/bus_car_mf08ez.png",
    name: "22 Passenger Executive Minibus",
    passengers: 22,
    bags: 22,
    price: "Request a Quote",
  },
  {
    image:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710473805/alexlimoimg/lincolnNavigator_zcvthv.png",
    name: "Cadillac Escalade ESV",
    passengers: 6,
    bags: 6,
    price: "Request a Quote",
  },
  {
    image:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710473700/alexlimoimg/cadillacxts_erdtsh.png",
    name: "Cadillac XTS",
    passengers: 2,
    bags: 3,
    price: "Request a Quote",
  },
  {
    image:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710474291/alexlimoimg/38passenger_tbgnvk.png",
    name: "38 Passenger Executive Minibus",
    passengers: 38,
    bags: 38,
    price: "Request a Quote",
  },
];

export const airports: AiportProps[] = [
  {
    key: "ohare",
    name: "O'Hare International Airport",
    address: "10000 W Balmoral Ave, Chicago, IL 60666",
    lat: 41.9802452,
    lng: -87.9115595,
  },
  {
    key: "midway",
    name: "Chicago Midway International Airport",
    address: "5700 S Cicero Ave, Chicago, IL 60638",
    lat: 41.7867799,
    lng: -87.7547633,
  },
  {
    key: "executive",
    name: "Chicago Executive Airport-PWK",
    address: "1020 Plant Rd, Wheeling, IL 60090",
    lat: 42.1161327,
    lng: -87.9041804,
  },
  {
    key: "coleman",
    name: "B. Coleman Aviation",
    address: "5701 Industrial Hwy, Gary, IN 46406",
    lat: 41.61765118035516,
    lng: -87.40652558994462,
  },
  {
    key: "atlantic",
    name: "Atlantic Aviation MDW",
    address: "6150 S Laramie Ave, Chicago, IL 60638",
    lat: 41.78079148017956,
    lng: -87.75306000408798,
  },
  {
    key: "signatureord",
    name: "Signature Aviation ORD",
    address: "825 Patton Dr Building 825, Chicago, IL 60666",
    lat: 41.991052258549445,
    lng: -87.88976456213948,
  },
  {
    key: "signaturemdw",
    name: "Signature Aviation MDW",
    address: "5821 S Central Ave, Chicago, IL 60638",
    lat: 41.786344605237694,
    lng: -87.76169627298191,
  },
];

export const reviews: ReviewProps[] = [
  {
    rating: 5,
    image:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1707531214/alexlimoicons/vehicle-icon_qwd000.png",
    label: "Variety of vehicles",
    description:
      "Our vehicles are frequently inspected for safety and quality insuring we go above and beyond your expectations while delivering a tranquil and quality experience",
  },
  {
    rating: 5,
    image:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1707531214/alexlimoicons/heart_myezb3.png",
    label: "Best Client Service",
    description:
      "We can assist you with the details and planning starting with what vehicle to choose. Assisting with the proper time and desired route in order to provide you with a seamless experience",
  },
  {
    rating: 5,
    image:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1707531319/alexlimoicons/star_o96mhm.png",
    label: "Fastest Route Guarantee",
    description:
      "All of our vehicles are equipped with the latest state of the art navigation systems with real time weather and traffic data. This enables our drivers to execute the fastest and best route avoiding delays.",
  },
];

export const Services = [
  {
    value: "to_airport",
    label: "To Airport",
  },
  {
    value: "from_airport",
    label: "From Airport",
  },
  {
    value: "point_to_point",
    label: "Point-to-Point Transfer",
  },
  {
    value: "hourly_charter",
    label: "Hourly Charter",
  },
];

export const routes = [
  "/",
  "/reservation/",
  "/corporations/",
  "/contact-us/",
  "/privacy-policy/",
  "/terms-conditions/",
];
