import { Auth } from "firebase/auth";
import Header from "./header";
import { FcTodoList } from "react-icons/fc";
import localFont from "next/font/local";
import { cn } from "@/libs/utils";

interface TitleProps {
  auth?: Auth;
}

const headingFont = localFont({
  src: "../../../../public/Fredoka/static/Fredoka-Medium.ttf",
});

const Title = ({ auth }: TitleProps) => {
  return (
    <div className="">
      <header>
        <Header auth={auth} />
      </header>
      <div
        className={cn("flex justify-center -mt-6 mb-4", headingFont.className)}
      >
        <h1 className="text-4xl">
          <div className="text-6xl">All you</div>
          <br />
          <div className="flex items-center ml-24 -mt-6">
            have to
            <h2 className="ml-2 text-purple-600">do</h2>
            <FcTodoList className="text-4xl ml-3" />
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Title;
