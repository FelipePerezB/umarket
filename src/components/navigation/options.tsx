import Link from "next/link";

export default function Options({
  currentOption,
  options,
}: {
  currentOption: string;
  options?: { url?: string; opt: string; id?: string }[];
}) {
  return (
    options &&
    options?.length > 1 && (
      <div className="flex justify-center gap-6 rounded-2xl bg-gray-50/80 px-3 py-1.5 w-max mx-auto">
        {options?.map(({ opt, url, id }) => {
          const isSelected = currentOption === id || currentOption === opt;
          return (
            <Link
              key={`opt-${id ?? opt}`}
              href={url ?? ""}
              className={`cursor-pointer ${
                isSelected ? "text-blue-500 font-normal" : ""
              }`}
            >
              {opt}
            </Link>
          );
        })}
      </div>
    )
  );
}
