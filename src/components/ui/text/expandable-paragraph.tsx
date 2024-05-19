"use client";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useRef, useState } from "react";
import Icon from "../icons/sm";

export default function ExpandableParagraph({ children }: { children: ReactNode }) {
  const parragraphRef = useRef<HTMLDivElement>(null);
  const initialMaxParragraphHeigh = 144;
  const [maxParragraphHeigh, setMaxParragraphHeigh] = useState<string | number>(
    initialMaxParragraphHeigh
  );

  return (
    <div>
      <div
        style={{ maxHeight: `${maxParragraphHeigh}px` }}
        className="overflow-hidden"
      >
        <div ref={parragraphRef}>{children}</div>
      </div>
      <span
        onClick={() =>
          setMaxParragraphHeigh(
            initialMaxParragraphHeigh === maxParragraphHeigh
              ? 1000000
              : initialMaxParragraphHeigh
          )
        }
        className="text-blue-400 hover:text-blue-700 cursor-pointer"
      >
        <div className="flex items-center gap-1.5 mt-2">
          {initialMaxParragraphHeigh === maxParragraphHeigh ? (
            <>
              Ver más <Icon icon={faChevronDown} />
            </>
          ) : (
            <>
              Ver menos <Icon icon={faChevronUp} />
            </>
          )}
        </div>
      </span>
    </div>
  );
}
