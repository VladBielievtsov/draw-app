import React from "react";
import { GoPencil } from "react-icons/go";
import { LuMousePointer2 } from "react-icons/lu";
import { IoText } from "react-icons/io5";

interface ToolsProps {
  tools: string[];
  currentTool: string;
  setCurrentTool: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tools({
  tools,
  currentTool,
  setCurrentTool,
}: ToolsProps) {
  const changeTool = (tool: string) => {
    setCurrentTool(tool);
  };

  return (
    <div className="space-x-4 flex">
      {tools.map((item) => (
        <button
          key={item}
          className={item === currentTool ? "btn active" : "btn"}
          title={item}
          onClick={() => changeTool(item)}
        >
          {item === "pen" && <GoPencil />}
          {item === "mouse" && <LuMousePointer2 />}
          {item === "text" && <IoText />}
        </button>
      ))}
    </div>
  );
}
