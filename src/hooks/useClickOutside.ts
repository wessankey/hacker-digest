import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

export const useClickOutside = <T extends HTMLElement>(
  callback: CallbackFunction
): React.RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent): void => {
      if (!(event.target instanceof Node)) return;

      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [callback]);

  return ref;
};
