import { useState, useEffect } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface UseTimerResult {
  timeLeft: TimeLeft;
  progress: number;
}

export function useTimer(
  isActive: boolean,
  initialTime?: TimeLeft
): UseTimerResult {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    initialTime || {
      hours: 4,
      minutes: 12,
      seconds: 53,
    }
  );
  const [progress, setProgress] = useState(15); // Starting at 15% complete

  useEffect(() => {
    // Mock countdown timer
    if (!isActive) return;

    const totalSeconds =
      timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;

    if (totalSeconds <= 0) return;

    const timer = setTimeout(() => {
      // Update time
      let newSeconds = timeLeft.seconds - 1;
      let newMinutes = timeLeft.minutes;
      let newHours = timeLeft.hours;

      if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes -= 1;
      }

      if (newMinutes < 0) {
        newMinutes = 59;
        newHours -= 1;
      }

      setTimeLeft({
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
      });

      // Update progress (slowly increases as time decreases)
      // Total time is 4h 12m 53s = 15173 seconds
      // We'll go from 15% to 100% during this time
      const initialTotalSeconds = 4 * 3600 + 12 * 60 + 53;
      const currentProgress =
        15 + (85 * (initialTotalSeconds - totalSeconds)) / initialTotalSeconds;
      setProgress(Math.min(100, currentProgress));
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  return { timeLeft, progress };
}
