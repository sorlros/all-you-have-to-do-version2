"use client";

import { useTimer } from "@/app/hooks/use-timer";
import { Dialog, DialogContent } from "../ui/dialog";
import TimeCarousel from "../time-carousel";
import { Button } from "../ui/button";
import DayCarousel from "../day-carousel";
import useTimerStore from "@/app/hooks/use-timer-store";
import { useState } from "react";
import { FaSun } from "react-icons/fa";
import { MdNightlight } from "react-icons/md";
import { cn } from "@/libs/utils";
import { toast } from "sonner";
import useTokenWithUidStore from "@/app/hooks/use-token-with-uid-store";
import { createAlarm } from "@/actions/alarm/create-alaram";
import useSendNotificationToBackend from "@/app/hooks/use-send-notification-to-backend";
import convertDayOfWeekToNumber from "@/libs/convert-day-to-number";
import { Spinner } from "../spinner";
import TimePicker from "../time-picker";
import DayPicker from "../day-picker";
interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
    icon: string;
    day: string;
    isDay: string;
  };
}

const TimerModal = () => {
  const timerModal = useTimer();
  const isOpen = useTimer((state) => state.isOpen);
  const [isClick, setIsClick] = useState("");
  const [isDay, setIsDay] = useState<string>("");

  const { content, setContent, time, day } = useTimerStore();
  const { uid, token } = useTokenWithUidStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendNotification = useSendNotificationToBackend();

  const handleSubmit = async () => {
    console.log("aSD", content, time, day)
    if (content === "" || time === "" || day === "") {
      return alert("모든 항목을 선택해야 알람이 설정됩니다.");
    }

    try {
      setIsLoading(true);
      const { content, time, day } = useTimerStore.getState();
      const { uid } = useTokenWithUidStore.getState();

      const dayOfWeek = convertDayOfWeekToNumber(day);

      const data = {
        data: {
          title: "All you have to do 알람",
          body: content,
          image: "/images/logo.png",
          icon:"/icon-192x192.png",
          time: time,
          day: day,
          isDay: isDay
        },
      };

      const alarmData = {
        data: {
          title: "All you have to do 알람",
          body: content,
          image: "/images/logo.png",
          icon:"/icon-192x192.png",
          time: time,
          day: dayOfWeek,
          isDay: isDay,
          uid: uid
        },
      };

      await createAlarm({ content, time, day, uid });

      await sendNotification({ ...alarmData }, token);

      // await sendMessage({...alarmData, token})

      timerModal.onClose();
      toast.success("알람을 생성했습니다.");
      setIsLoading(false);
    } catch (error) {
      toast.error("알람 생성에 실패했습니다.");
      setIsLoading(false);
    }
  };

  const handleButtonClick = (buttonType: string) => {
    setIsClick(buttonType);
    setIsDay(buttonType)
  };

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
