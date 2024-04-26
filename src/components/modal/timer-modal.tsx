"use client";

import { useTimer } from "@/app/hooks/use-timer";
import { Dialog, DialogContent } from "../ui/dialog";
import TimeCarousel from "../time-carousel";
import { Button } from "../ui/button";
import DayCarousel from "../day-carousel";
import useTimerStore from "@/app/hooks/use-timer-store";
import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { MdNightlight } from "react-icons/md";
import { cn } from "@/libs/utils";
import { toast } from "sonner";
import useTokenWithUidStore from "@/app/hooks/use-token-with-uid-store";
import { createAlarm } from "@/actions/alarm/create-alaram";
import useSendNotificationToBackend from "@/app/hooks/use-send-notification-to-backend";
import { initializingApp } from "@/libs/initialize-app";
interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
  };
}

const TimerModal = () => {
  const timerModal = useTimer();
  const isOpen = useTimer((state) => state.isOpen);
  const [isClick, setIsClick] = useState("");

  const { content, setContent, time, day } = useTimerStore();
  const { uid, token } = useTokenWithUidStore();

  const sendNotification = useSendNotificationToBackend();

  const handleSubmit = async () => {
    if (content === "" || time === "" || day === "") {
      return alert("모든 항목을 선택해야 알람이 설정됩니다.");
    }

    try {
      const { content, time, day } = useTimerStore.getState();
      const { uid } = useTokenWithUidStore.getState();

      const data: NotificationData = {
        data: {
          title: "title",
          body: content,
          image: "image",
          time: time,
        },
      };

      await createAlarm({ content, time, day, uid });

      // const message = await sendFCMNotification(data, uid);
      // console.log("handleMessage", message);

      // onMessage(messaging, (message) => {
      //   console.log("asdasd", message);
      // });
      // await sendFCMNotification(data);
      await sendNotification({ ...data, token });

      timerModal.onClose();
      toast.success("알람을 생성했습니다.");
    } catch (error) {
      toast.error("알람 생성에 실패했습니다.");
    }
  };

  const handleButtonClick = (buttonType: string) => {
    setIsClick(buttonType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={timerModal.onClose}>
      <DialogContent className="w-full h-[70vh] p-6 overflow-hidden flex flex-col bg-white">
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
        <TimeCarousel />
        <DayCarousel />
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
      </DialogContent>
    </Dialog>
  );
};

export default TimerModal;
