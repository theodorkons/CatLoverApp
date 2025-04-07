import { CatInfo } from "../types";

export default function Breed({ url, id, breeds }: CatInfo) {
  const name = breeds[0].name;
  return (
    <div className="cursor-pointer">
      <img
        src={url ?? ""}
        alt={`${name} breed image`}
        className="h-[20rem] w-full object-cover"
      />
      <p>{name}</p>
    </div>
  );
}
