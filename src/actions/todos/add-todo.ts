"use server";

import { db } from "@/libs/prisma/db";
import cuid from "cuid";
interface AddTodoProps {
  title: string;
  exTodo: string;
  newValue: string;
  token: string;
  uid: string;
}

export const addTodo = async ({
  title,
  exTodo,
  newValue,
  token,
  uid,
}: AddTodoProps) => {
  try {
    const titleInfo = await db.title.findFirst({
      where: {
        name: title,
        uid,
      },
    });

    if (!titleInfo) {
      throw new Error(`타이틀 '${title}'을(를) 찾을 수 없습니다.`);
    }

    // console.log("exTODO", exTodo);
    if (titleInfo) {
      if (exTodo !== undefined && exTodo !== "") {
        const existingTodo = await db.todo.findFirst({
          where: {
            content: exTodo,
            titleId: titleInfo.id,
          },
        });

        if (existingTodo) {
          console.log("existingTodo", existingTodo);
          await db.todo.update({
            where: {
              id: existingTodo.id,
            },
            data: {
              content: newValue,
            },
          });
          console.log("todo 업데이트 완료");
          return { message: "Todo가 업데이트되었습니다." };
        }

        // exTodo가 존재하므로 업데이트
      } else {
        // todo 생성
        if (newValue === "") return;
        const scheduleId = cuid();

        const createTodo = await db.todo.create({
          data: {
            uid,
            token,
            content: newValue,
            titleId: titleInfo.id,
            scheduleId,
          },
        });
        console.log("todo 생성 완료");

        if (createTodo) {
          await db.schedule.create({
            data: {
              id: scheduleId,
              uid,
              token,
              content: newValue,
            },
          });
        }
        return { message: "Todo가 생성되었습니다." };
      }
    }
  } catch (error) {
    console.error("error", error);
  }
};
