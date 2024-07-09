import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const TimePicker = () => {
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());

  const handleHourChange = (direction: number) => {
    setSelectedHour((prevHour) => (prevHour + direction + 24) % 24);
  };

  const handleMinuteChange = (direction: number) => {
    setSelectedMinute((prevMinute) => (prevMinute + direction + 60) % 60);
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
        <div className="text-2xl">{String(selectedHour).padStart(2, '0')}</div>
        <button onClick={() => handleHourChange(-1)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
          ▼
        </button>
      </div>
      <div className="flex flex-col items-center" {...minuteHandlers}>
        <button onClick={() => handleMinuteChange(1)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
          ▲
        </button>
        <div className="text-2xl">{String(selectedMinute).padStart(2, '0')}</div>
        <button onClick={() => handleMinuteChange(-1)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
          ▼
        </button>
      </div>
    </div>
  );
};

export default TimePicker;