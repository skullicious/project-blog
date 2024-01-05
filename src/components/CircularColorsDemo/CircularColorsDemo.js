import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timer, setTimer] = React.useState(false);

  const [timeElapsed, setTimeElapsed] = React.useState(0);

  const toggleTimer = () => {
    setTimer(!timer);
  };

  const handleReset = () => {
    setTimer(false);
    setTimeElapsed(0);
    setSelectedColor(COLORS[0]);
  };

  const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);

  React.useEffect(() => {
    let timerId;

    if (timer) {
      timerId = window.setInterval(() => {
        console.log("tick");

        const nextTimeElapsed = timeElapsed + 1;
        setTimeElapsed(nextTimeElapsed);

        const mod = timeElapsed % 3;

        setSelectedColor(COLORS[mod]);
      }, 1000);
    }

    return () => {
      window.clearInterval(timerId);
    };
  }, [timer, timeElapsed]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && <div className={styles.selectedColorOutline} />}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => toggleTimer()}>
            {!timer ? (
              <>
                <Play />
                <VisuallyHidden>Play</VisuallyHidden>
              </>
            ) : (
              <>
                <Pause />
                <VisuallyHidden>Pause</VisuallyHidden>
              </>
            )}
          </button>
          <button onClick={() => handleReset()}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
