"use client";


import { Dialog, DialogContent } from "../ui/dialog";

import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/libs/utils";
import { toast } from "sonner";
import { Spinner } from "../spinner";
import { useMessage } from "@/app/hooks/use-message";
import useMessageStore from "@/app/hooks/use-message-store";

const TimerModal = () => {
  const timerModal = useMessage();
  const isOpen = useMessage((state) => state.isOpen);


  const { title, body, image } = useMessageStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={timerModal.onClose}>
      <DialogContent className="w-full h-[50vh] p-6 overflow-hidden flex flex-col bg-white">
        <div className="">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleButtonClick("AM")}
            className={cn(
              "hover:bg-slate-400 active:bg-slate-700",
              isClick === "AM"
                ? "bg-slate-500 hover:bg-slate-200"
                : "bg-white hover:bg-slate-400 active:bg-slate-700",
            )}
          >
            <FaSun className="text-orange-600 mr-2" />
            AM
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleButtonClick("PM")}
            className={cn(
              "hover:bg-slate-400 active:bg-slate-700",
              isClick === "PM"
                ? "bg-slate-500 hover:bg-slate-200"
                : "bg-white hover:bg-slate-400 active:bg-slate-700",
            )}
          >
            <MdNightlight className="text-yellow-400 mr-2" />
            PM
          </Button>
        </div>
        {/* <TimeCarousel /> */}
        {/* <DayCarousel /> */}
        <TimePicker />
        <DayPicker />
        {isLoading ? ( <div className="w-full h-[75px] border-slate-100"><Spinner /></div> ) : 
          <Button
          type="submit"
          variant="outline"
          size="lg"
          className="flex text-center"
          onClick={() => {
            handleSubmit();
          }}
        >
          알람 저장하기
        </Button>
        }    
      </DialogContent>
    </Dialog>
  );
};

export default TimerModal;
