import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import Konva from "konva";

interface ILine {
  color: string;
  stroke: number;
  points: any;
}

function App() {
  const [color, setColor] = useState("#d3d3d3");
  const [stroke, setStroke] = useState(5);
  const [lines, setLines] = useState<ILine[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (evt: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = evt.target.getStage()?.getPointerPosition();
    if (pos) {
      setLines([...lines, { color, stroke, points: [pos.x, pos.y] }]);
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

  const colors = ["#d3d3d3", "#e03131", "#2f9e44", "#1971c2", "#f08c00"];

  useEffect(() => {
    document.querySelectorAll(".colors button")[0].classList.add("active");
  }, []);

  const changeColor = (color: string) => {
    setColor(color);
  };

  const strokeSizes = [5, 10, 15];

  const changeStroke = (stroke: number) => {
    setStroke(stroke);
  };

  return (
    <>
      <div className="paint">
        <header>
          {/* <button className="btn save">Save</button> */}
          <button className="btn clear" onClick={() => setLines([])}>
            Clear
          </button>
        </header>
        <main>
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handlerMouseMove}
            onMouseup={handleMouseUp}
          >
            <Layer>
              {lines.map((line, id) => (
                <Line
                  key={id}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={line.stroke}
                  // tr={0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  tension={0.5}
                />
              ))}
            </Layer>
          </Stage>
        </main>
        <div className="settings">
          <div className="colors">
            {colors.map((color) => (
              <button
                key={color}
                style={{ backgroundColor: color }}
                title={color}
                onClick={() => changeColor(color)}
              ></button>
            ))}
          </div>
          <div className="size">
            <p>Stroke width</p>
            <div>
              {strokeSizes.map((stroke) => (
                <button
                  key={stroke}
                  className="btn"
                  title={String(stroke)}
                  onClick={() => changeStroke(stroke)}
                >
                  {stroke}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
