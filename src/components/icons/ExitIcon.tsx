export default function ExitIcon({ fill = "black" }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill={fill}
    >
      <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.42L10.59 12l-4.89 4.88a1 1 0 1 0 1.41 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z" />
    </svg>
  );
}
