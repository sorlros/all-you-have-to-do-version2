"use server";

import admin from "firebase-admin";

const serviceAccount = require("/serviceAccountKey.json");

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const listAllTokens = async () => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    console.log("1", listUsersResult);
    const users = listUsersResult.users;
    console.log("users", users);
    const allTokens: string[] = [];

    console.log("등록된 토큰 목록:", allTokens);
    return allTokens;
  } catch (error) {
    console.error("등록된 토큰을 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
