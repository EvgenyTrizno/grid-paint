import { ChangeEvent, FC, useState } from "react";

import styles from "./App.module.scss";

const App: FC = () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [penColor, setPenColor] = useState<string>("#000");
    const [grid, setGrid] = useState<boolean>();
    const [cells, setCells] = useState<boolean[]>([]);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [isDrawingEnabled, setIsDrawingEnabled] = useState<boolean>(false);
    const [isErasing, setIsErasing] = useState<boolean>(false);

    const handleCreateGrid = () => {
        setCells(new Array(width * height).fill(false));
        setGrid(true);
    };

    const handleClearGrid = () => {
        setCells(new Array(width * height).fill(false));
        setGrid(false);
    };

    const handleCellMouseDown = (i: number) => {
        if (isDrawingEnabled) {
            setIsDrawing(true);
            handleCellAction(i);
        }
    };

    const handleCellMouseUp = () => {
        setIsDrawing(false);
    };

    const handleCellMouseEnter = (i: number) => {
        if (isDrawingEnabled && isDrawing) {
            handleCellAction(i);
        }
    };

    const handleCellAction = (i: number) => {
        if (grid) {
            const newCells = [...cells];
            if (isErasing) {
                newCells[i] = false;
            } else {
                newCells[i] = true;
            }
            setCells(newCells);
        }
    };

    const handleEraserClick = () => {
        setIsErasing(true);
    };

    const handlePenClick = () => {
        setIsDrawingEnabled((prev) => !prev);
    };

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <div className={styles.inputs}>
                        <div className={styles.box}>
                            <label>
                                Ширина сетки
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    className={styles.range}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => setWidth(+e.target.value)}
                                    value={`${width}`}
                                />
                            </label>
                            <span>{width}</span>
                        </div>
                        <div className={styles.box}>
                            <label>
                                Высота сетки
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    className={styles.range}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => setHeight(+e.target.value)}
                                    value={`${height}`}
                                />
                            </label>
                            <span>{height}</span>
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <button onClick={handleCreateGrid}>
                            Создать сетку
                        </button>
                        <button onClick={handleClearGrid}>
                            Очистить сетку
                        </button>
                        <input
                            type="color"
                            value={`${penColor}`}
                            onChange={(e) => setPenColor(e.target.value)}
                        />
                        <button onClick={handleEraserClick}>Ластик</button>
                        <button onClick={handlePenClick}>Ручка</button>
                    </div>
                </div>
                {grid && (
                    <div
                        className={styles.grid}
                        style={{
                            gridTemplateColumns: `repeat(${width}, 7px)`,
                            gridTemplateRows: `repeat(${height}, 7px)`,
                        }}
                    >
                        {cells.map((item, i) => (
                            <div
                                key={i + 1}
                                className={styles.item}
                                style={{
                                    backgroundColor: item
                                        ? penColor
                                        : undefined,
                                }}
                                onMouseDown={() => handleCellMouseDown(i)}
                                onMouseUp={handleCellMouseUp}
                                onMouseEnter={() => handleCellMouseEnter(i)}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
