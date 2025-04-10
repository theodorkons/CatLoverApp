import { Link, useLocation } from "react-router";

export default function NavLinkItem({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${
        isActive ? "font-bold" : "font-normal"
      } text-rose transition-colors duration-200 hover:scale-110 text-lg`}
    >
      {label}
    </Link>
  );
}
