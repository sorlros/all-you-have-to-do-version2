import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const TimePicker: React.FC = () => {
  const currentHour = new Date().getHours() % 12 || 12; // 1부터 12까지 표시
  const [selectedHour, setSelectedHour] = useState<number>(currentHour);
  const [selectedMinute, setSelectedMinute] = useState<number>(new Date().getMinutes());

  const handleHourChange = (direction: number) => {
    setSelectedHour((prevHour) => {
      const newHour = (prevHour + direction) % 12;
      return newHour === 0 ? 12 : newHour;
    });
  };

  const handleMinuteChange = (direction: number) => {
    setSelectedMinute((prevMinute) => (prevMinute + direction + 60) % 60);
  };

  const handleHourInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 12) {
      setSelectedHour(value);
    }
  };

  const handleMinuteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value < 60) {
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
          type="number"
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
          type="number"
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
