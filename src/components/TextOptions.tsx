import React from "react";

interface TextOptionsProps {
  isVisible: boolean;
  colors: string[];
  currentTextColor: string;
  setCurrentTextColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextOptions({
  isVisible,
  colors,
  currentTextColor,
  setCurrentTextColor,
}: TextOptionsProps) {
  const changeColor = (color: string) => {
    setCurrentTextColor(color);
    if (document.querySelector("input.textEditing")) {
      (
        document.querySelector("input.textEditing") as HTMLInputElement
      ).style.color = color;
    }
  };

  return (
    <div
      className={`absolute bottom-4 left-4 border border-[#d3d3d3] rounded-md p-4 ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <p className="text-[#d3d3d3] mb-[5px]">Color</p>
      <div className="colors grid grid-cols-4 gap-4">
        {colors.map((col) => (
          <button
            key={col}
            className={
              col === currentTextColor ? "colors-btn active" : "colors-btn"
            }
            style={{ backgroundColor: col }}
            title={col}
            onClick={() => changeColor(col)}
          ></button>
        ))}
      </div>

      {/* <p className="text-[#d3d3d3] mb-[5px] mt-[10px]">Stroke width</p>
      <div className="flex space-x-2">
        {strokeSizes.map((size) => (
          <button
            key={size}
            className={size === currentStroke ? "btn active" : "btn"}
            title={String(size)}
            onClick={() => changeStroke(size)}
          >
            {size}
          </button>
        ))}
      </div> */}
    </div>
  );
}
