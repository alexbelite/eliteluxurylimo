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
