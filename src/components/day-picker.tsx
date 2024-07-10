import useTimerStore from "@/app/hooks/use-timer-store";
import { Button } from "./ui/button";
import { useState } from "react";

const DayPicker = () => {
  const { setDay } = useTimerStore();
  const [selectedItem, setSelectedItem] = useState<string>();

  const handleDayClick = (day: string) => {
    setDay(day);
    setSelectedItem(day);
  };

  const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

  return (
    <div className="flex gap-x-1 w-full h-[50px] justify-between">
      {days.map((day) => (
        <Button
          key={day}
          size="sm"
          variant="outline"
          className={`flex-1 bg-gray-200 hover:bg-gray-300 ${
            selectedItem === day ? "bg-slate-700 text-white" : ""
          }`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </Button>
      ))}
    </div>
  );
};

export default DayPicker;
