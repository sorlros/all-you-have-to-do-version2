import { firebaseConfig } from "@/config/firebase-config";
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; 파이어 스토어 사용시
// import { getStorage } from "firebase/storage"; 스토리지 사용시
// import { getAuth } from "firebase/auth"; 인증 사용시

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 사용할 기능들은 알아보기 쉽게 이름을 지은뒤 export 해서 필요한곳에 사용하자
// export const db = getFirestore();
// export const storage = getStorage();
// export const auth = getAuth();

export default app;
