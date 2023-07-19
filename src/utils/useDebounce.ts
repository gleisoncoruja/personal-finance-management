import { useRef, useCallback } from "react";

type UseDebounceProps = {
  fn: (...args: unknown[]) => void;
  delay: number;
};

const useDebounce = ({ fn, delay }: UseDebounceProps) => {
  const timeoutRef = useRef<number | null>(null);

  const debounceFn = useCallback(
    (...params: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (typeof fn === "function") {
          fn(...params);
        }
      }, delay);
    },
    [fn, delay]
  );

  return debounceFn;
};

export default useDebounce;
