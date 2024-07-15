"use client";

import { Button } from "@/components/ui/button";
import { Auth, onAuthStateChanged } from "firebase/auth";
import {
  signInAnonymous,
  signInWithGoogle,
  signOut,
} from "@/libs/firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { PiWarningFill } from "react-icons/pi";
import { UserInfoProps, createUser } from "@/actions/user/google-user";
import { useRouter } from "next/navigation";
import { createAnonymousUser } from "@/actions/user/anonymous-user";
import { HeaderTooltip } from "./tooltip";
import { verifyToken } from "@/libs/firebase/get-token";
import useTokenWithUidStore from "@/app/hooks/use-token-with-uid-store";
import { initializingApp } from "@/libs/initialize-app";

interface HeaderProps {
  auth?: Auth;
}

const Header = ({ auth }: HeaderProps) => {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>("");
  const [userPhoto, setUserPhoto] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token, setToken, uid, setUid } = useTokenWithUidStore();
  
  useEffect(() => {
    console.log("auth", auth)
  }, [auth])

  const isAnonymous = auth?.currentUser?.isAnonymous;

  const handleAnonymous = async () => {
    try {
      const credential = await signInAnonymous();
      if (credential) {
        const user = credential.user;
        const userInfo = {
          displayName: "anonymous",
          email: null,
          uid: user.uid,
        };
        const token = await verifyToken();
        if (token) {
          setToken(token);
          setUid(userInfo.uid);
          await createAnonymousUser(userInfo, token);
        } else {
          return console.log("토큰값이 존재하지 않습니다.");
        }
      }
      setUserId("익명의 사용자");
      setUserPhoto("/images/anonymous.png");
      router.push("/user");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const credential = await signInWithGoogle();
      if (credential) {
        const user = credential.user;
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        };
        setUid(user.uid);
        const token = await verifyToken();

        if (token) {
          setToken(token);
          await createUser(userInfo, token);
          // router.push("/user");
        } else {
          setIsLoading(false);
          return console.log("token이 존재하지 않습니다.");      
        }
      }
      router.push("/user");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // onAuthStateChanged 함수를 사용하여 사용자 인증 상태의 변경을 감지합니다.
    if (auth) {
      // console.log("auth", auth)
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // 사용자가 로그인한 경우, user 객체를 통해 사용자 정보에 접근할 수 있습니다.
          // console.log("user", user);
          setUserId(user.displayName);
          setUid(user.uid);
          setUserPhoto(user.photoURL);
          console.log("로그인 성공");
          // console.log("token, uid", token, uid);
          router.refresh();
        } else {
          // 사용자가 로그아웃한 경우 또는 인증되지 않은 경우
          setUserId(null);
          setUserPhoto(null);
          localStorage.setItem("token", "");
          localStorage.setItem("uid", "");
          setUid("");
          setToken("");
          router.push("/");
        }
      });

      return () => unsubscribe();
    }
  }, [auth, router, setUid, setToken, token, uid]);

  return (
    <div className="w-full h-[50px] flex justify-end items-center gap-2 p-5 pt-10">
      {auth !== undefined ? (
        <>
          {isAnonymous && (
            <HeaderTooltip
              icon={PiWarningFill}
              label="익명 유저는 일주일 후 정보가 삭제됩니다."
              color="red"
            />
          )}
          {userPhoto && (
            <>
              <div className="flex rounded-lg w-[45px] h-[45px] relative">
                <Image
                  src={userPhoto}
                  alt="User"
                  className="w-full h-auto object-cover absolute rounded-lg"
                  sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
                  width={25}
                  height={25}
                />
              </div>
              <h1>{userId} 님</h1>
            </>
          )}
          <Button onClick={() => signOut()}>로그아웃</Button>
        </>
      ) : (
        <>
          <div className="flex inset-0">
            <FcGoogle size={35} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSignInWithGoogle()}
            >
              Google로 로그인
            </Button>
          </div>
          <div className="flex inset-0">
            <Image
              src="/images/anonymous.png"
              alt="anonymous"
              width={35}
              height={30}
              style={{
                width: "auto",
                height: "auto",
              }}
              // sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
            />
            <Button variant="ghost" size="sm" onClick={() => handleAnonymous()}>
              익명으로 로그인
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
