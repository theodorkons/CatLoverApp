import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Grid({ children, className }: Props) {
  return (
    <div
      className={twMerge(
        "grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid gap-3",
        className
      )}
    >
      {children}
    </div>
  );
}
