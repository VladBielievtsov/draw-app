import { RefObject, useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Transformer } from "react-konva";
import Konva from "konva";

import Burger from "./components/Burger";
import Tools from "./components/Tools";
import PenOptions from "./components/PenOptions";

export interface ILine {
  currentColor: string;
  currentStroke: number;
  points: any;
}

function App() {
  const tools = ["pen", "mouse"];
  const [currentTool, setCurrentTool] = useState("mouse");
  const [currentColor, setCurrentColor] = useState("#d3d3d3");
  const [currentStroke, setCurrentStroke] = useState(5);
  const stageRef: RefObject<Konva.Stage> = useRef(null);
  const rectRef: RefObject<Konva.Rect> = useRef(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [lines, setLines] = useState<ILine[]>([]);
  const isDrawing = useRef(false);

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
            <Burger stageRef={stageRef} setLines={setLines} />
          </div>
          <div className="absolute z-10 top-4 right-4">
            <Tools
              tools={tools}
              currentTool={currentTool}
              setCurrentTool={setCurrentTool}
            />
          </div>
        </header>
        <main>
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
              <Rect
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
              />
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
