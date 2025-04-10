import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import ExitIcon from "./icons/ExitIcon";
import { useLockScroll } from "../hooks/useLockScroll";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  exitIconColor?: string;
  className?: string;
}

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  onClose,
  exitIconColor = "white",
  className,
}: Props) {
  useLockScroll(isOpen);

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 rounded-md" />
          <div
            className={twMerge(
              "rounded-lg z-40 fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[40rem] shadow-lg",
              className
            )}
          >
            <div
              className="cursor-pointer absolute right-6 top-3.5 z-40"
              onClick={() => {
                setIsOpen(false);
                if (onClose) {
                  onClose();
                }
              }}
            >
              <ExitIcon fill={exitIconColor} />
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
}
