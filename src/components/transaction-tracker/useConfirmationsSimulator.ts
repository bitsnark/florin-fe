//TODO: Once we have a real API, we can remove this hook

import { useState, useEffect, useRef } from 'react';

interface UseConfirmationsSimulatorProps {
  isActive: boolean;
  maxConfirmations?: number;
  minDelay?: number;
  maxDelay?: number;
  initialDelay?: number;
}

/**
 * Custom hook to simulate increasing transaction confirmations
 *
 * @param isActive - Whether the simulation should be active
 * @param maxConfirmations - Maximum number of confirmations to reach (default: 20)
 * @param minDelay - Minimum delay between confirmations in ms (default: 1000)
 * @param maxDelay - Maximum delay between confirmations in ms (default: 4000)
 * @param initialDelay - Initial delay before first confirmation in ms (default: 1500)
 * @returns Current number of confirmations
 */
export function useConfirmationsSimulator({
  isActive,
  maxConfirmations = 20,
  minDelay = 1000,
  maxDelay = 4000,
  initialDelay = 1500,
}: UseConfirmationsSimulatorProps) {
  const [confirmations, setConfirmations] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear the timeout when the hook is unmounted or when isActive changes
  useEffect(() => {
    // Reset confirmations when simulation is deactivated
    if (!isActive) {
      setConfirmations(0);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    const simulateNextConfirmation = () => {
      setConfirmations((prev) => {
        const newValue = prev + 1;
        if (newValue >= maxConfirmations) {
          return maxConfirmations;
        }

        // Schedule next confirmation with random delay
        const randomDelay =
          Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
        timeoutRef.current = setTimeout(simulateNextConfirmation, randomDelay);

        return newValue;
      });
    };

    // Start the simulation with initial delay
    timeoutRef.current = setTimeout(simulateNextConfirmation, initialDelay);

    // Cleanup function that will be called when the component unmounts
    // or when isActive, maxConfirmations, minDelay, maxDelay, or initialDelay changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isActive, maxConfirmations, minDelay, maxDelay, initialDelay]);

  return confirmations;
}
