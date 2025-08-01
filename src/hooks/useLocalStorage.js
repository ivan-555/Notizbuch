import { useState, useEffect, useRef } from "react";

export function useLocalStorage(key, initialValue) {
  const isInitialMount = useRef(true);
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return initialValue;
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`Could not write ${key} to localStorage`);
    }
  }, [key, value]);

  return [value, setValue];
}