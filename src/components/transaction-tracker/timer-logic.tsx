import { useState, useEffect, useRef } from 'react';
import { 
  addSeconds, 
  differenceInSeconds,
  intervalToDuration
} from 'date-fns';

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
  initialTime: TimeLeft 
): UseTimerResult {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTime);
  const [progress, setProgress] = useState(15); // Starting at 15% complete
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<Date | null>(null);
  const initialTimeRef = useRef<TimeLeft>(initialTime);

  useEffect(() => {
    // Update initialTimeRef when initialTime changes
    initialTimeRef.current = initialTime;
    
    if (!isActive) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      endTimeRef.current = null;
      setTimeLeft(initialTime);
      return;
    }

    const totalSeconds =
      initialTimeRef.current.hours * 3600 + 
      initialTimeRef.current.minutes * 60 + 
      initialTimeRef.current.seconds;

    if (totalSeconds <= 0) return;

    // Set the end time when the timer starts
    if (!endTimeRef.current) {
      endTimeRef.current = addSeconds(new Date(), totalSeconds);
    }

    const updateTimer = () => {
      const now = new Date();
      const remainingSeconds = differenceInSeconds(endTimeRef.current!, now);
      
      if (remainingSeconds <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      // Convert remaining seconds to duration using date-fns
      const duration = intervalToDuration({ start: 0, end: remainingSeconds * 1000 });
      
      setTimeLeft({
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
      });

      // Update progress (slowly increases as time decreases)
      const initialTotalSeconds = 4 * 3600 + 12 * 60 + 53;
      const currentProgress =
        15 + (85 * (initialTotalSeconds - remainingSeconds)) / initialTotalSeconds;
      setProgress(Math.min(100, currentProgress));

      timerRef.current = setTimeout(updateTimer, 1000);
    };

    // Start the timer immediately
    updateTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      endTimeRef.current = null;
    };
  }, [isActive, initialTime]);

  return { timeLeft, progress };
}
