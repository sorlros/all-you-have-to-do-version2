import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';
import * as admin from "firebase-admin";

export const config = { matcher: '/welcome' };

export async function middleware() {
  const projectId = await get("project_id") as string;
  const clientEmail = await get("client_mail") as string;
  const privateKey = await get("private_key") as string;
  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: privateKey
      })
    });
    console.log("SET SDK");
  }
}