"use client";

import { cn } from "@/libs/utils";
import { Suspense, useEffect, useId, useState } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Lists from "../(main)/(_components)/lists";
import { Spinner } from "@/components/spinner";
import AlertMessage from "../(main)/(_components)/alert-message";

const poppins = Poppins({ subsets: ["latin"], weight: "500", style: "normal" });

const pageTitles = [
  { title: "주방", content: ["재료 손질하기", "정리정돈 하기"] },
  { title: "운동", content: ["스쿼트 3세트", "푸쉬업 5세트", "런닝 10분하기"] },
  {
    title: "목표",
    content: [
      "매일 오후 7시 운동하기",
      "영양제 먹을 시간",
      "은행 가기",
      "집정리 하기",
    ],
  },
  {
    title: "지출",
    content: ["전공서적 구매하기", "계좌 내역 확인하기", "커피 2잔 구매하기"],
  },
  {
    title: "기타",
    content: [],
  },
];

const ExamplePage = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);

  const id = useId();

  useEffect(() => {
    const initialCheckedItems: boolean[][] = [];
    pageTitles.forEach((page) => {
      const pageCheckedItems = new Array(page.content.length).fill(false);
      initialCheckedItems.push(pageCheckedItems);
    });
    setCheckedItems(initialCheckedItems);
  }, [setCheckedItems]);

  const handleClick = (index: number) => {
    setPageIndex(index);
  };

  const playSound = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[pageIndex][index] = !newCheckedItems[pageIndex][index];
    setCheckedItems(newCheckedItems);
    let audioFile = checkedItems[pageIndex][index]
      ? "/tap-notification-180637.mp3"
      : "/pop-39222.mp3";
    const audio = new Audio(audioFile);
    audio.play();
  };

  return (
    <div
      className={cn(
        "flex space-x-4 w-full h-3/4 rounded-xl",
        poppins.className,
      )}
    >
      <AlertMessage />
      <article className="w-1/4 h-9/10 bg-white rounded-xl mx-auto">
        <div className="flex flex-wrap w-full h-1/3 gap-2 items-center justify-center mx-auto p-3">
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
        </div>
        <Lists onClick={(index: number) => handleClick(index)} />
        {/* <button onClick={btnClickHandler}>알림 보내기</button> */}
      </article>
      <article className="w-2/4 h-9/10 bg-white rounded-xl p-9 pl-8">
        <div className="flex -ml-2">
          <FcAcceptDatabase size="50px" />
          <h1 className="flex text-2xl items-center ml-2">
            {pageTitles[pageIndex].title}
          </h1>
        </div>
        {pageTitles[pageIndex].content.map((item, index) => (
          <div key={index}>
            <div className="flex justify-start space-x-2 mb-5 mt-5">
              <Checkbox
                id={`${id}-${index}`}
                checked={
                  checkedItems[pageIndex] && checkedItems[pageIndex][index]
                }
                onClick={() => playSound(index)}
                className="mr-3"
              />
              <Label id={`${id}-${index}`}>{item}</Label>
            </div>
            <hr className="w-full h-1 mt-4" />
          </div>
        ))}
      </article>
      <article className="w-1/4 h-9/10 bg-white rounded-xl p-3 relative">
        <Suspense fallback={<Spinner />}>
          <Image
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src={`/images/main-${pageIndex}.jpeg`}
            alt="image"
            priority
            fill
            sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
          />
        </Suspense>
      </article>
    </div>
  );
};

export default ExamplePage;
