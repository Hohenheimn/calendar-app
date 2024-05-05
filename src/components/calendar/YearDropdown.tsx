import { useRef, useEffect } from "react";
import { format } from "date-fns";

export type YearDropdownProps = {
  Years: any;
  currenYear: string;
  setCurrentYear: Function;
  setToggleButton: Function;
  toggleButton: {
    month: boolean;
    year: boolean;
  };
};

export const YearsDropdown = ({
  Years,
  currenYear,
  setCurrentYear,
  setToggleButton,
  toggleButton,
}: YearDropdownProps) => {
  const YearContainerScrollable = useRef<any>(null);

  const YearsSort = Years.map((year: Date) => format(year, "yyyy")).sort(
    (a: number, b: number) => b - a
  );

  const scrollToTarget = () => {
    YearContainerScrollable.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToTarget();
  }, [toggleButton]);

  return (
    <>
      <ul className="absolute top-full left-0 bg-white shadow-md w-[20rem] max-h-[200px] overflow-auto">
        {YearsSort.map((year: string, index: any) => (
          <li
            key={index}
            style={{
              width: "100%",
              marginBottom: "0",
            }}
            ref={currenYear === year ? YearContainerScrollable : undefined}
            className={`py-1 px-2 text-[12px] border-b w-full cursor-pointer hover:bg-primary-400 hover:text-white ${
              currenYear === year
                ? " bg-primary-500 text-white"
                : "text-[#757575]"
            }`}
            onClick={() => {
              setCurrentYear(year);
              setToggleButton({
                ...toggleButton,
                year: false,
              });
            }}
          >
            <p className=" text-lg">{year}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
