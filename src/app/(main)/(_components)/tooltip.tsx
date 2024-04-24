import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconType } from "react-icons";



interface TooltipProps {
  icon: IconType;
  label: string;
  color: string;
}


export const HeaderTooltip = ({ icon: Icon, label, color }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          < Icon color={color} size={25}/>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}