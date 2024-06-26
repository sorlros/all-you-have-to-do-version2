import * as admin from 'firebase-admin';

export const firebaseAdminConfig = {
  privateKey: (process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig)
  });
  console.log("SET SDK");
}

export { admin };