import { useEffect } from "react";

export function useSaveToLocalStorage(key, value) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
}
