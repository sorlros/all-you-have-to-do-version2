"use server";

import { db } from "../../libs/prisma/db";

export interface UserInfoProps {
  displayName: string | null;
  email: string | null;
  uid: string;
}

export const createUser = async (
  userInfo: UserInfoProps,
  userToken: string,
) => {
  // console.log("받아온 userInfo", userInfo);
  if (!userInfo) {
    throw new Error("유저 정보가 없습니다.");
  }

  if (!userToken) {
    throw new Error("토큰이 유효하지 않습니다.");
  }

  if (typeof userToken !== "string") {
    throw new Error("토큰이 유효하지 않습니다.");
  }

  const { email, displayName, uid } = userInfo;

  try {
    if (email && displayName && uid) {
      const existingUser = await db.user.findUnique({
        where: {
          uid,
        },
      });
      if (existingUser) {
        const tokenList = existingUser.token;

        if (tokenList.includes(userToken)) {
          // 이미 토큰이 리스트에 포함되어 있는 경우
          return;
        } else {
          const updatedTokenList = [...tokenList, userToken];
          const updatedUser = await db.user.update({
            where: {
              uid,
            },
            data: {
              token: updatedTokenList,
            },
          });
          console.log("토큰 추가 완료");
          return updatedUser;
        }
      } else {
        const arrayToken: Array<string> = [];
        arrayToken.push(userToken);
        const user = await db.user.create({
          data: {
            uid,
            name: displayName,
            token: arrayToken,
            email,
          },
        });

        if (user) {
          const titles = await db.title.createMany({
            data: [
              { name: "주방", uid, token: userToken },
              { name: "운동", uid, token: userToken },
              { name: "목표", uid, token: userToken },
              { name: "지출", uid, token: userToken },
              { name: "기타", uid, token: userToken },
            ],
          });
          console.log("titles 생성완료", titles);
          return user;
        } else {
          console.log("user생성 오류");
        }
        console.log("유저 생성완료");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
