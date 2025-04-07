export default function PopupError(error: string) {
  return <div className="fixed bottom-1 right-1 bg-red-400 p-4">{error}</div>;
}
