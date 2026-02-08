"use client";

import { useEffect, RefObject, useCallback } from "react";

export const useOutSideClick = (
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void,
) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        return;
      }
      if ((e.target as HTMLElement).closest(".react-datepicker")) {
        return;
      }
      callback();
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
};
