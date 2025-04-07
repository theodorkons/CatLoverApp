import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  className?: string;
}

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  onClose,
  className,
}: Props) {
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40" />
          <div
            className={twMerge(
              "rounded-lg overflow-y-scroll z-50 fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[40rem] shadow-lg",
              className
            )}
          >
            <img
              src="/icons/exitIcon.svg"
              alt="exit icon"
              className="w-6 h-6 cursor-pointer absolute left-1 top-1"
              onClick={() => {
                setIsOpen(false);
                if (onClose) {
                  onClose();
                }
              }}
            />

            {children}
          </div>
        </>
      )}
    </>
  );
}
