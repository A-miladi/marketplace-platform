"use client";

import { useCallback, useEffect, useState } from "react";

interface TimerProps {
  initialSeconds: number;
}

interface TimerReturn {
  seconds: number;
  timerEnded: boolean;
  restart: () => void;
}
export const useTimer = ({ initialSeconds }: TimerProps): TimerReturn => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [timerEnded, setTimerEnded] = useState<boolean>(false);

  const updateTimer = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 1) {
        setTimerEnded(true);
        return 0;
      }
      return prevSeconds - 1;
    });
  };

  const restart = useCallback(() => {
    setSeconds(initialSeconds);
    setTimerEnded(false);
  }, [initialSeconds]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (seconds > 0) {
      timeoutId = setTimeout(updateTimer, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [seconds]);

  return { seconds, timerEnded, restart };
};
