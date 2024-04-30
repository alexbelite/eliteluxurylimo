// UI Components Imports
import { ColorlibStepIconRoot } from "@/components/FormFiles/ReservationFormSteps/UI/ColorlibStepIconRoot";
// import { MdCheck } from "react-icons/md";

export default function ColorlibStepIcon(props: any) {
  const { active, completed, className, icon } = props;
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icon}
    </ColorlibStepIconRoot>
  );
}
