import { twMerge } from "tailwind-merge";

interface Props {
  errorMessage: string;
  className?: string;
}

export default function DisplayError({ errorMessage, className }: Props) {
  return (
    <div
      className={twMerge(
        "text-3xl text-center mt-16 font-semibold md:text-4xl",
        className
      )}
    >
      {errorMessage}
    </div>
  );
}
