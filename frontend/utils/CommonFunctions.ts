// Third party imports
import toast from "react-hot-toast";
import { scroller } from "react-scroll";

export const scrollTo = (sectionName: string | null | undefined) => {
  if (sectionName) {
    setTimeout(() => {
      scroller.scrollTo(sectionName, {
        duration: 2000,
        delay: 300,
        smooth: true,
      });
    }, 500);
  }
};

export const errorHandler = (error: any) => {
  toast.error(error.response.data.message);
};
