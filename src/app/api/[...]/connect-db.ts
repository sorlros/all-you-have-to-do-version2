import * as admin from 'firebase-admin';
import mongoose from "mongoose";

const connectDB = async () => {
  let firebase;

  try {
    if (admin.apps.length === 0) {
      firebase = admin.initializeApp({
        credential: admin.credential.cert(process.env.SERVICE_ACCOUNT_KEY as admin.ServiceAccount)
      })
      console.log("firebase SDK 초기화 완료");
    } else {
      firebase = admin.app();
      console.log("set FCM");
    }

    await mongoose.connect(process.env.DATABASE_URL as string);

    mongoose.set("autoCreate", true);

    console.log("Mongoose connected...");
  } catch (error) {
    console.log("Monngose 에러", error);
    process.exit(1);
  }
}

export default connectDB;