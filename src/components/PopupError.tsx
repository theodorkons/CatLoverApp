import { createPortal } from "react-dom";

interface Props {
  error: string;
}

export default function PopupError({ error }: Props) {
  return createPortal(
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-[1000]">
      {error}
    </div>,
    document.body
  );
}
