"use server";

import { db } from "@/libs/prisma/db";
import { TitleWithTodos } from "@/libs/type";

export const getTitleWithTodos = async (uid: string, pageIndex: number) => {
  let title: string;

  try {
    if (pageIndex !== null && pageIndex >= 0 && pageIndex <= 4) {
      if (pageIndex === 0) {
        title = "주방";
      } else if (pageIndex === 1) {
        title = "운동";
      } else if (pageIndex === 2) {
        title = "목표";
      } else if (pageIndex === 3) {
        title = "지출";
      } else if (pageIndex === 4) {
        title = "기타";
      } else {
        title = ""; // 처리되지 않은 경우
      }

      const titleWithTodos = await db.title.findUnique({
        where: {
          name_uid: {
            name: title,
            uid,
          },
        },
        include: {
          todos: true,
        },
      });

      if (titleWithTodos) {
        const result: TitleWithTodos = {
          title: {
            name: title,
            todos: titleWithTodos.todos.map((todo) => todo.content),
          },
        };

        // console.log("result", result);
        return result;
      } else {
        throw new Error("db에서 titleWithTodos값을 얻지 못했습니다.");
      }
    } else {
      throw new Error("유효하지 않은 pageIndex입니다.");
    }
  } catch (error) {
    // throw new Error("getTitleWithTodos 실패");
    console.error(error);
  }
};
