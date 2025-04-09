import { twMerge } from "tailwind-merge";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-6",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={twMerge(
          `${sizeClasses[size]} border-white border-t-rose border-l-rose rounded-full animate-spin`,
          className
        )}
      ></div>
    </div>
  );
}
