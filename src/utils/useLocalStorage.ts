import { useState } from "react";
import { ICard } from "./types";

const useLocalStorage = (key = "cards", initialValue: ICard[] = []) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: ICard[]) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      window.localStorage.setItem(key, JSON.stringify([]));
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
