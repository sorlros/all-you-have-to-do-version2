"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface ListsProps {
  onClick: (index: number) => void;
  // isActivated: boolean;
}

export const labelLists = [
  { title: "주방", icon: "🍽️" },
  { title: "운동", icon: "🏋🏻‍♀️" },
  { title: "목표", icon: "⛳️" },
  { title: "지출", icon: "💳" },
  { title: "기타", icon: "🤔" },
];

const Lists = ({ onClick }: ListsProps) => {
  const [isActivated, setIsActivated] = useState<{ [key: number]: boolean }>({
    [0]: true,
  });

  const handleClick = (index: number) => {
    onClick(index);
    setIsActivated((prevState) => {
      const newState: { [key: number]: boolean } = {};
      Object.keys(prevState)
        .map(Number)
        .forEach((key) => {
          newState[key] = false;
        });
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="flex flex-col w-full h-2/3 mx-auto mt-4">
      <div>
        <h1 className="text-lg pl-5 pr-3">Lists</h1>
      </div>
      <div className="flex flex-col text-md w-full cursor-pointer mt-3">
        {labelLists.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={
              isActivated[index]
                ? "bg-neutral-100 pl-5 pr-3 pt-2 pb-2 hover:bg-neutral-100"
                : "bg-white pl-5 pr-3 pt-2 pb-2 hover:bg-neutral-100"
            }
          >
            {item.icon}
            <span className="pl-5">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;
