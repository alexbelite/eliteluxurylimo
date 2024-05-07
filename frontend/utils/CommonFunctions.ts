// Third party imports
import toast from "react-hot-toast";
import { scroller } from "react-scroll";

export const scrollTo = (sectionName: string | null | undefined) => {
  if (sectionName) {
    setTimeout(() => {
      scroller.scrollTo(sectionName, {
        duration: 1500,
        delay: 500,
        smooth: true,
      });
    }, 500);
  }
};

export const errorHandler = (error: any) => {
  toast.error(error.response.data.message);
};

export const makeid = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export function calculateCharge(
  directionsData: any,
  vehicleType: string,
  meetAndGreet?: boolean,
  childSeat?: boolean
) {
  let baseCharge = 0;
  const miles = Number(
    directionsData?.routes[0].legs[0].distance.text.split("mi")[0]
  );

  // Determine base charge based on vehicle type and miles
  if (miles <= 10) {
    baseCharge = vehicleType === "sedan" ? 95.39 : 122.85;
  } else if (miles <= 20) {
    baseCharge = vehicleType === "sedan" ? 109.36 : 137.54;
  } else if (miles <= 30) {
    baseCharge = vehicleType === "sedan" ? 129.98 : 171.46;
  } else if (miles <= 40) {
    baseCharge = vehicleType === "sedan" ? 141.28 : 172.54;
  } else if (miles <= 50) {
    baseCharge = vehicleType === "sedan" ? 154.2 : 189.5;
  } else if (miles <= 70) {
    baseCharge = vehicleType === "sedan" ? 189.45 : 232.48;
  } else {
    return "quote";
  }

  // Add charges for additional services
  if (meetAndGreet) {
    baseCharge += 40;
  }
  if (childSeat) {
    baseCharge += 35;
  }

  return `$${baseCharge.toFixed(2)}`;
}
