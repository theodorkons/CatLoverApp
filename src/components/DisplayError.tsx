import { twMerge } from "tailwind-merge";

interface Props {
  errorMessage: string;
  className?: string;
}

export default function DisplayError({ errorMessage, className }: Props) {
  return (
    <div className={twMerge("text-lg text-center", className)}>
      {errorMessage}
    </div>
  );
}
