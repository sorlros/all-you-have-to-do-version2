"use client";

import { addTodo } from "@/actions/todos/add-todo";
import { getTitleWithTodos } from "@/actions/todos/get-title-with-todos";
import { removeTodo } from "@/actions/todos/remove-todo";
import { useTimer } from "@/app/hooks/use-timer";
import useTimerStore from "@/app/hooks/use-timer-store";
import useTokenWithUidStore from "@/app/hooks/use-token-with-uid-store";
import { Spinner } from "@/components/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TitleWithTodos } from "@/libs/type";
import { MessagePayload, getMessaging, onMessage } from "firebase/messaging";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LuCopyPlus } from "react-icons/lu";
import { toast } from "sonner";
interface TodosProps {
  pageIndex: number;
}

const Todos = ({ pageIndex }: TodosProps) => {
  const { uid, token } = useTokenWithUidStore();
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const timerModal = useTimer();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [pageData, setPageData] = useState<TitleWithTodos>({
    title: {
      name: "",
      todos: [""],
    },
  });
  const setContent = useTimerStore((state) => state.setContent);

  const inputRefs = useRef<any>({});
  const id = useId();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (uid !== "") {
          const titleWithTodos = await getTitleWithTodos(uid, pageIndex);
          // console.log("초기 데이터", { titleWithTodos, uid, pageIndex });

          if (titleWithTodos) {
            setPageData(titleWithTodos);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            toast.error("Todos를 불러오지 못했습니다.");
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log("페이지 변경중 오류 발생", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageIndex, uid]);

  useEffect(() => {
    const initialCheckedItems: boolean[] = [];
    if (pageData) {
      const todos = pageData.title.todos;

      if (todos.length > 0 && todos !== undefined) {
        const titleCheckedItems: boolean[] = new Array(todos.length).fill(
          false,
        );
        initialCheckedItems.push(...titleCheckedItems);
        setCheckedItems(initialCheckedItems);
      } else {
        return;
      }
    }
  }, [pageData]);

  const playSound = (index: number) => {
    setIsLoading(true);
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    let audioFile = checkedItems[index]
      ? "/tap-notification-180637.mp3"
      : "/pop-39222.mp3";
    const audio = new Audio(audioFile);
    audio.play();

    const value = pageData.title.todos[index];
    setContent(value);
    
    setIsLoading(false);
    timerModal.onOpen();
  };

  const onBlur = async (
    event: React.FocusEvent<HTMLInputElement>,
    index: number,
  ) => {
    setIsLoading(true);
    try {
      const title = pageData.title.name;
      const exTodo = pageData.title.todos[index];
      const newValue = event.target.value;

      const newPageData = { ...pageData };
      const newTodos = [...newPageData.title.todos];
      const lastItemIndex = newTodos.length - 1;
      newTodos[lastItemIndex] = newValue;

      newPageData.title.todos = newTodos;

      if (newValue === "") {
        newTodos.pop();
        setPageData({
          title: {
            name: newPageData.title.name,
            todos: newTodos,
          },
        });
        setIsLoading(false);
        return toast.error("공백은 저장할 수 없습니다.");
      }

      // console.log("재료", { title, newValue, exTodo, token, uid });

      const afterTodo = await addTodo({ title, newValue, exTodo, token, uid });
      setPageData(newPageData);
      setIsLoading(false);
      toast.success(afterTodo?.message);
    } catch (error) {
      setIsLoading(false);
      toast.error("Todo 생성에 실패했습니다.");
    }
  };

  const handleDelete = async (index: number) => {
    setIsLoading(true);
    try {
      const newPageData = { ...pageData };
      const newTodos = [...newPageData.title.todos];

      if (newTodos.length > 0 && newTodos[newTodos.length - 1] === "") {
        newTodos.splice(index, 1);
        setPageData({
          title: {
            name: newPageData.title.name,
            todos: newTodos,
          },
        });
        setIsLoading(false);
      }

      const willDeleteTodo = newTodos[index];
      newTodos.splice(index, 1);

      setPageData({
        title: {
          name: newPageData.title.name,
          todos: newTodos,
        },
      });

      await removeTodo(willDeleteTodo, uid);
      setIsLoading(false);
      toast.success("Todo 제거가 완료되었습니다.");
    } catch (error) {
      console.error("todo 제거 오류");
      setIsLoading(false);
      toast.error("Todo 제거에 실패했습니다.");
    }
  };

  const handlePlusClick = () => {
    setIsLoading(true);
    const newPageData = { ...pageData };
    const newTodos = [...newPageData.title.todos];

    try {
      if (newTodos.length > 0 && newTodos[newTodos.length - 1] === "") {
        setIsLoading(false);
        return toast.error("이미 생성된 메모가 공백 상태입니다.");
      } else {
        newTodos.push("");
        newPageData.title.todos = newTodos;
        setPageData(newPageData);

        setTimeout(() => {
          const lastInputRef = inputRefs.current[newTodos.length - 1];
          if (lastInputRef) {
            lastInputRef.focus();
            lastInputRef.select();
          }
        }, 0);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-[80%]">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => handlePlusClick()}
        className="absolute top-9 right-8"
      >
        <LuCopyPlus size={25} className="flex justify-end mt-2" />
      </button>

      {pageData.title &&
        !isLoading &&
        pageData.title.todos.map((todo, index) => (
          <div key={`key-${index}-${id}`}>
            <div className="flex w-full h-[30px] justify-start space-x-2 mb-5 mt-5">
              <Checkbox
                id={`${id}-${index}`}
                checked={checkedItems[index]}
                onClick={() => playSound(index)}
                className="flex mr-3 items-center justify-center"
              />
              <Label id={`${id}-${index}`} className="w-full">
                <Input
                  id={`label-${index}`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  defaultValue={todo}
                  className="text-md"
                  onBlur={(event) => onBlur(event, index)}
                />
              </Label>
              <div
                className="flex justify-end items-center cursor-pointer"
                onClick={() => handleDelete(index)}
              >
                <AiOutlineClose />
              </div>
            </div>

            <hr className="w-full h-1 mt-4" />
          </div>
        ))}
    </>
  );
};

export default Todos;
