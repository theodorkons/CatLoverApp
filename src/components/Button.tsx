import React from "react";
import { twMerge } from "tailwind-merge";
import Loader from "./Loader";

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export default function Button({
  onClick,
  children,
  loading,
  className,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "bg-rose text-white disabled:opacity-60 p-4 cursor-pointer relative inline-flex items-center justify-center rounded-sm",
        className
      )}
      disabled={loading}
    >
      <div className={`${loading ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>

      {loading && (
        <Loader
          size="sm"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </button>
  );
}
