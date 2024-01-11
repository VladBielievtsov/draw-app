import Konva from "konva";
import React, { RefObject, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoImageOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import { ILine, IText } from "../App";

interface BurgerProps {
  stageRef: RefObject<Konva.Stage>;
  setLines: React.Dispatch<React.SetStateAction<ILine[]>>;
  setText: React.Dispatch<React.SetStateAction<IText[]>>;
}

export default function Burger({ stageRef, setLines, setText }: BurgerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const downloadURI = (uri: string | undefined, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    const uri = stageRef.current?.toDataURL();
    downloadURI(uri, "image.png");
  };

  const clear = () => {
    setLines([]);
    setText([]);
  };

  return (
    <div className="relative z-40">
      <button className="btn bg-[#121212]" onClick={() => setIsOpen(!isOpen)}>
        <RxHamburgerMenu />
      </button>
      <div
        className={`absolute top-[50px] z-30 bg-[#121212] border border-[#d3d3d3] rounded-md w-[230px] p-[8px] ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button
          className=" hover:bg-[#2a2a2a] rounded-md text-left px-2.5 h-[36px] w-full flex items-center text-white space-x-2"
          onClick={() => handleExport()}
        >
          <div>
            <IoImageOutline />
          </div>
          <span className="text-white">Save to...</span>
        </button>
        <button
          className=" hover:bg-[#2a2a2a] rounded-md text-left px-2.5 h-[36px] w-full flex items-center text-white space-x-2"
          onClick={() => clear()}
        >
          <div>
            <RiDeleteBin7Line />
          </div>
          <span className="text-white">Clear canvas</span>
        </button>
      </div>
    </div>
  );
}
