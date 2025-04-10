import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import ExitIcon from "./icons/ExitIcon";
import { useLockScroll } from "../hooks/useLockScroll";

interface FlipModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  front: React.ReactNode;
  back: React.ReactNode;
  flipDisabled?: boolean;
}

export default function FlipModal({
  isOpen,
  setIsOpen,
  className,
  front,
  back,
  flipDisabled = false,
}: FlipModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  useLockScroll(isOpen);

  const exitIcon = (
    <div
      className="absolute top-3 hover:scale-120 right-4 z-50 cursor-pointer"
      onClick={() => setIsOpen(false)}
    >
      <ExitIcon fill="#cf6785" />
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50" />
      <div
        className={twMerge(
          "z-50 fixed bg-transparent top-1/2 left-1/2",
          "transform -translate-x-1/2 -translate-y-1/2",
          "max-w-[30rem] max-h-[40rem] w-[97%] h-full shadow-lg rounded-lg no-scrollbar",
          className
        )}
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute w-full h-full overflow-y-auto bg-white [backface-visibility:hidden]"
            onClick={(e) => {
              if (!flipDisabled) {
                setIsFlipped(true);
                e.stopPropagation();
              }
            }}
          >
            {!isFlipped && (
              <>
                {exitIcon}
                {front}
              </>
            )}
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute w-full h-full overflow-y-auto bg-white cursor-pointer [backface-visibility:hidden] [transform:rotateY(180deg)]"
            onClick={(e) => {
              setIsFlipped(false);
              e.stopPropagation();
            }}
          >
            {isFlipped && (
              <>
                {exitIcon}
                {back}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
