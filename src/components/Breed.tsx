import CatImage from "./CatImage";

interface Props {
  url: string;
  name: string;
}

export default function Breed({ name, url }: Props) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md transition-shadow duration-300 relative group cursor-pointer">
      <CatImage url={url} alt={`${name} breed image`} />
      <div className="rounded-sm absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
        <p className="text-white text-lg font-semibold">{name}</p>
      </div>
    </div>
  );
}
