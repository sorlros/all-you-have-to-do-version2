"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const AlertMessage = () => {
  const [hidden, setHidden] = useState(false);

  // useEffect(() => {
  //   const screenWidth = window.innerWidth;
  //   if (screenWidth < 1200) {
  //     setHidden(true);
  //   } else if (screenWidth >= 1200) {
  //     setHidden(false);
  //   }
  //   console.log(screenWidth);
  // }, [screenWidth]);

  return hidden ? null : (
    <div className="absolute top-[-30px] left-3 w-[300px] h-[200px]">
      <div className="relative w-full h-full">
        <Image
          className="max-w-lg w-full h-full object-cover"
          src="/images/pngegg.png"
          alt="message-box"
          fill
          sizes="cover"
          // style={{
          //   width: "auto",
          //   height: "auto",
          // }}
        />
        <h4 className="absolute inset-0 flex items-center justify-center max-w-[280px] ml-5">
          로그인 시 메모와 알람 등의
          <br /> 기능들을 사용하실 수 있습니다.
        </h4>
      </div>
    </div>
  );
};

export default AlertMessage;
