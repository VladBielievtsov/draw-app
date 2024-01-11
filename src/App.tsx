import { RefObject, createElement, useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Transformer, Text } from "react-konva";
import Konva from "konva";

import Burger from "./components/Burger";
import Tools from "./components/Tools";
import PenOptions from "./components/PenOptions";

export interface ILine {
  currentColor: string;
  currentStroke: number;
  points: any;
}

export interface IText {
  text: string;
  points: any;
}

function App() {
  // Tools
  const tools = ["mouse", "pen", "text"];
  const [currentTool, setCurrentTool] = useState("mouse");
  // Draw
  const [currentColor, setCurrentColor] = useState("#d3d3d3");
  const [currentStroke, setCurrentStroke] = useState(5);
  const [lines, setLines] = useState<ILine[]>([]);
  const isDrawing = useRef(false);
  // Text
  const [text, setText] = useState<IText[]>([]);
  const isWritning = useRef(false);
  const [tempPos, setTempPos] = useState<any>([]);
  // Other
  const stageRef: RefObject<Konva.Stage> = useRef(null);
  const rectRef: RefObject<Konva.Rect> = useRef(null);
  const trRef = useRef<Konva.Transformer>(null);

  const handleMouseDown = (evt: Konva.KonvaEventObject<MouseEvent>) => {
    if (currentTool === "pen") {
      isDrawing.current = true;
      const pos = evt.target.getStage()?.getPointerPosition();
      if (pos) {
        setLines([
          ...lines,
          { currentColor, currentStroke, points: [pos.x, pos.y] },
        ]);
      }
    } else if (currentTool === "text") {
      const pos = evt.target.getStage()?.getPointerPosition();
      if (!isWritning.current) {
        isWritning.current = true;
        setTempPos([pos?.x, pos?.y]);
        if (pos) {
          const textarea = document.createElement("input");
          textarea.classList.add("textEditing");
          textarea.style.cssText = `
          position:absolute;
          top: calc(${pos.y}px - 3px);
          left:${pos.x}px;
          background-color:transparent;
          border:0;
          outline:0;
          color:#d3d3d3;
          font-family: 'Architects Daughter';
          font-size: 40px;
          line-height: 1.2;
          width: calc(100% - ${pos.x}px);
          `;
          textarea.type = "text";
          document.querySelector(".paint")?.appendChild(textarea);
          setTimeout(() => {
            textarea.focus();
          }, 0);
        }
      } else {
        isWritning.current = false;
        const textInput = document.querySelector(
          "input.textEditing"
        ) as HTMLInputElement;
        setText([
          ...text,
          {
            text: (
              document.querySelector("input.textEditing") as HTMLInputElement
            ).value,
            points: [tempPos[0], tempPos[1]],
          },
        ]);
        textInput?.remove();
        setTempPos([]);
        setCurrentTool("mouse");
      }
    }
  };

  const handlerMouseMove = (evt: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const stage = evt.target.getStage();
    const point = stage?.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    lastLine.points = lastLine.points.concat([point?.x, point?.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const colors = [
    "#d3d3d3",
    "#e03131",
    "#2f9e44",
    "#1971c2",
    "#6a5acd",
    "#f08c00",
  ];

  useEffect(() => {
    document.querySelectorAll(".colors button")[0].classList.add("active");

    if (rectRef.current && trRef.current) {
      trRef.current.nodes([rectRef.current]);
    }
  }, []);

  const strokeSizes = [5, 10, 15];

  return (
    <>
      <div className="paint">
        <header className="w-full">
          <div className="absolute z-10 top-4 left-4">
            <Burger stageRef={stageRef} setLines={setLines} setText={setText} />
          </div>
          <div className="absolute z-10 top-4 right-4">
            <Tools
              tools={tools}
              currentTool={currentTool}
              setCurrentTool={setCurrentTool}
            />
          </div>
        </header>
        <main className="cursor-crosshair">
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handlerMouseMove}
            onMouseup={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <Rect
                width={window.innerWidth}
                height={window.innerHeight}
                fill="#121212"
              />
              {text.map((txt, id) => (
                <Text
                  key={id}
                  text={txt.text}
                  fill={"#d3d3d3"}
                  x={txt.points[0]}
                  y={txt.points[1]}
                  fontSize={40}
                  fontFamily="Architects Daughter"
                  lineHeight={1.2}
                />
              ))}
              {/* <Rect
                width={40}
                height={40}
                fill="#f00"
                x={window.innerWidth / 2 - 20}
                y={window.innerHeight / 2 - 20}
                ref={rectRef}
                draggable
              />
              <Transformer
                // anchorStroke="red"
                // anchorFill="yellow"
                // anchorSize={20}
                ref={trRef}
              /> */}
              {lines.map((line, id) => (
                <Line
                  key={id}
                  points={line.points}
                  stroke={line.currentColor}
                  strokeWidth={line.currentStroke}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  tension={0.5}
                />
              ))}
            </Layer>
          </Stage>
        </main>
        <PenOptions
          isVisible={currentTool === "pen"}
          colors={colors}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          strokeSizes={strokeSizes}
          currentStroke={currentStroke}
          setCurrentStroke={setCurrentStroke}
        />
      </div>
    </>
  );
}

export default App;
