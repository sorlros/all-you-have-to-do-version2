"use server";

import { db } from "@/libs/prisma/db";
interface AlarmProps {
  content: string;
  time: string;
  day: string;
  uid: string;
}

export const createAlarm = async ({ content, time, day, uid }: AlarmProps) => {
  try {
    const alarm = await db.todo.findUnique({
      where: {
        content,
        uid,
      },
    });

    if (alarm) {
      await db.schedule.update({
        where: {
          id: alarm.scheduleId,
          uid,
        },
        data: {
          day,
          time,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
