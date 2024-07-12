import useTimerStore from '@/app/hooks/use-timer-store';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const TimePicker = () => {
  const currentHour = new Date().getHours() % 12 || 12; // 1부터 12까지 표시
  const [selectedHour, setSelectedHour] = useState<string>(String(currentHour));
  const [selectedMinute, setSelectedMinute] = useState<string>(String(new Date().getMinutes()));
  const { setTime } = useTimerStore();

  useEffect(() => {
    const hour = selectedHour;
    const minute = selectedMinute.padStart(2, '0');
    setTime(`${hour}:${minute}`);
  }, [selectedHour, selectedMinute, setTime]);

  const handleHourChange = (direction: number) => {
    setSelectedHour((prevHour) => {
      const hour = prevHour === '' ? 0 : parseInt(prevHour);
      const newHour = (hour + direction) % 12;
      return newHour <= 0 ? '12' : String(newHour === 0 ? 12 : newHour);
    });
  };

  const handleMinuteChange = (direction: number) => {
    setSelectedMinute((prevMinute) => {
      const minute = prevMinute === '' ? 0 : parseInt(prevMinute);
      const newMinute = (minute + direction + 60) % 60;
      return String(newMinute);
    });
  };

  const handleHourInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 12)) {
      setSelectedHour(value);
    }
  };

  const handleMinuteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) < 60)) {
      setSelectedMinute(value);
    }
  };

  const hourHandlers = useSwipeable({
    onSwipedUp: () => handleHourChange(1),
    onSwipedDown: () => handleHourChange(-1),
  });

  const minuteHandlers = useSwipeable({
    onSwipedUp: () => handleMinuteChange(1),
    onSwipedDown: () => handleMinuteChange(-1),
  });

  return (
    <div className="flex justify-center items-center space-x-8">
      <div className="flex flex-col items-center" {...hourHandlers}>
        <button onClick={() => handleHourChange(1)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
          ▲
        </button>
        <input
          type="text"
          value={selectedHour}
          onChange={handleHourInputChange}
          className="text-2xl text-center w-12 bg-white rounded-lg no-arrow"
        />
        <button onClick={() => handleHourChange(-1)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
          ▼
        </button>
      </div>
      <div className="flex flex-col items-center" {...minuteHandlers}>
        <button onClick={() => handleMinuteChange(1)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
          ▲
        </button>
        <input
          type="text"
          value={selectedMinute}
          onChange={handleMinuteInputChange}
          className="text-2xl text-center w-12 bg-white rounded-lg no-arrow"
        />
        <button onClick={() => handleMinuteChange(-1)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
          ▼
        </button>
      </div>
    </div>
  );
};

export default TimePicker;
