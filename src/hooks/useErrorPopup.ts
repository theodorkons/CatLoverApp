import { useEffect, useState, useCallback } from "react";

type Props = {
  error?: unknown;
  message?: string;
  duration?: number;
};

export default function useErrorPopup({
  error,
  message,
  duration = 5000,
}: Props) {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const triggerError = useCallback(
    (msg: string) => {
      setShowError(true);
      setErrorMessage(msg);

      const timer = setTimeout(() => {
        setShowError(false);
        setErrorMessage(null);
      }, duration);

      return () => clearTimeout(timer);
    },
    [duration]
  );

  useEffect(() => {
    if (error) {
      triggerError(message ?? "Something went wrong");
    }
  }, [error, message, triggerError]);

  return { showError, errorMessage, triggerError };
}
