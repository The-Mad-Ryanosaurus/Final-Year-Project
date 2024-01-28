import { useState } from "react";

export function useLocalStorage<T>(keyName: string, defaultValue: T): [T, (newValue: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      // Nothing to do here
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
}
