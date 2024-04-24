"use server";

import { db } from "@/libs/prisma/db";
import { TitlesWithTodos } from "@/libs/type";
interface GetTodos {
  uid: string;
  token?: string;
}

export const getTodos = async ({ uid, token }: GetTodos) => {
  try {
    const userWithData = await db.user.findUnique({
      where: {
        uid,
      },
      include: {
        titles: {
          include: {
            todos: true,
          },
        },
      },
    });

    if (!userWithData) {
      throw new Error(`UID ${uid}에 해당하는 사용자를 찾을 수 없습니다.`);
    }

    const titleWithTodos: TitlesWithTodos = {
      titles: userWithData.titles.map((title) => ({
        name: title.name,
        todos: title.todos.map((todo) => todo.content),
      })),
    };

    // console.log("data", titleWithTodos);

    return titleWithTodos;
  } catch (error) {
    console.error("유저의 todos 정보를 불러오지 못했습니다.", error);
    throw error;
  }
};
