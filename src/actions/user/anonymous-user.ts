"use server";

import { PrismaClient } from "@prisma/client";
import { db } from "../../libs/prisma/db";

export interface UserInfoProps {
  displayName: string | null;
  email: string | null;
  uid: string;
}

export const createAnonymousUser = async (
  userInfo: UserInfoProps,
  token: string,
) => {
  const prisma = new PrismaClient();

  // console.log("받아온 userInfo", userInfo);
  if (!userInfo) {
    throw new Error("유저 정보가 없습니다.");
  }

  if (!token) {
    throw new Error("토큰이 유효하지 않습니다.");
  }

  if (typeof token !== "string") {
    throw new Error("토큰이 유효하지 않습니다.");
  }

  const { uid } = userInfo;

  let user;
  let createdAt = new Date();

  try {
    user = await db.anonymousUser.create({
      data: {
        uid,
        token,
        createdAt,
      },
    });

    console.log("익명 유저 생성 완료");
  } catch (error) {
    console.log(error);
  }
};
