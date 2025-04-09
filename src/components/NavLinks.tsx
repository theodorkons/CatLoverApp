import NavLinkItem from "./NavLinkItem";

export default function NavLinks() {
  return (
    <>
      <NavLinkItem to="/" label="Home" />
      <NavLinkItem to="/breeds" label="Breeds" />
      <NavLinkItem to="/favourites" label="Favourites" />
    </>
  );
}
