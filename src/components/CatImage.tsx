import { twMerge } from "tailwind-merge";
import { imagePlaceHolder } from "../utils/constants";

interface Props {
  url: string | undefined;
  alt: string;
  className?: string;
}

export default function CatImage({ url, alt, className }: Props) {
  return (
    <img
      src={url || imagePlaceHolder}
      alt={alt}
      loading="lazy"
      className={twMerge(
        "w-full h-[20rem] rounded-sm object-cover object-top transition-transform duration-300 group-hover:scale-105 hover:scale-105 cursor-pointer",
        className
      )}
    />
  );
}
