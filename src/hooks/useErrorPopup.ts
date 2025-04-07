import { useEffect, useState } from "react";

export function useErrorPopup(error: string, duration: number = 4000) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (error) {
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), duration);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return showPopup;
}
