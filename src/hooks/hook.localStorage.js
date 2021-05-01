import { useEffect } from "react";
import { getSavedNumberVal } from "../helpers/localStorage";

function getParserHandler(value) {
  if (typeof value === "number") {
    return getSavedNumberVal;
  }
}

export function useSaveToLocalStorage(key, value) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
}
