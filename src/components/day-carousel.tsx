"use client";

import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useTimerStore from "@/app/hooks/use-timer-store";
import { cn } from "@/libs/utils";

const DayCarousel = () => {
  const { setDay } = useTimerStore();
  const [selectedItem, setSelectedItem] = useState<string>();

  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const dayItems = daysOfWeek.map((day, index) => (
    <div
      key={index}
      className={cn(
        "flex items-center justify-center bg-white border border-gray-300 rounded p-4 cursor-pointer",
        selectedItem === day
          ? "bg-slate-500 hover:bg-slate-200"
          : "hover:bg-slate-400 active:bg-slate-700",
      )}
      onClick={() => handleDayClick(day)}
    >
      {day}
    </div>
  ));

  const handleDayClick = (day: string) => {
    setDay(day);
    setSelectedItem(day);
  };

  // 캐러셀의 설정을 정의합니다.
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // 한 번에 이동할 슬라이드 수
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  return (
    <Carousel
      swipeable={true} // 스와이프 기능 활성화
      draggable={true} // 드래그 기능 활성화
      showDots={false} // 도트 표시 여부
      responsive={responsive} // 반응형 설정 적용
      ssr={true} // 서버사이드 렌더링 사용 여부
      infinite={true} // 무한 반복 여부
      // autoPlay={true} // 자동 재생 여부
      // autoPlaySpeed={3000} // 자동 재생 속도 (ms)
      keyBoardControl={true} // 키보드 컨트롤 활성화
      customTransition="all .5" // 전환 효과
      transitionDuration={500} // 전환 지속 시간 (ms)
      containerClass="" // 캐러셀 컨테이너 클래스
      removeArrowOnDeviceType={["tablet", "mobile"]} // 특정 기기에서 화살표 제거
      deviceType={"desktop"} // 기기 유형 설정
      dotListClass="custom-dot-list-style" // 도트 리스트 클래스
      itemClass="time-item" // 아이템 클래스
    >
      {/* 준비한 시간 아이템들을 렌더링합니다. */}
      {dayItems}
    </Carousel>
  );
};

export default DayCarousel;
