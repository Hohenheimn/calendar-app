import { useRef, useState } from "react";
import {
  eachDayOfInterval,
  eachYearOfInterval,
  endOfMonth,
  format,
  startOfDay,
  endOfWeek,
  startOfWeek,
  parse,
  add,
} from "date-fns";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import MonthDropdown from "./MonthDropdown";
import { YearsDropdown } from "./YearDropdown";

type Props = {
  onChange?: (value: string) => void;
  appointmentsDate: string[];
  selectedDate: string;
};

export default function Calendar({
  onChange,
  appointmentsDate,
  selectedDate,
}: Props) {
  const modal = useRef<any>();

  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [toggleButton, setToggleButton] = useState({
    month: false,
    year: false,
  });

  const date = new Date();

  // get date today
  let today = startOfDay(date);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM"));
  const [currenYear, setCurrentYear] = useState(format(today, "yyyy"));
  let wholeYear = currentMonth + "-" + currenYear;

  let firstDayofMonthYear = parse(wholeYear, "MMMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayofMonthYear),
    end: endOfWeek(endOfMonth(firstDayofMonthYear)),
  });

  let Years = eachYearOfInterval({
    start: new Date(1970, 6, 10),
    end: new Date(4000, 6, 10),
  });

  const SelectedDateHandler = (day: any) => {
    if (onChange) {
      onChange(format(day, "yyyy-MM-dd"));
    }
  };

  const PrevNext = (button: string) => {
    // Get Current Month and Year
    let firstDayCurrentMonth = parse(currentMonth, "MMMM", new Date());
    let firstDayCurrentYear = parse(currenYear, "yyyy", new Date());

    let firstdayNextMonth = add(firstDayCurrentMonth, {
      months: button === "next" ? 1 : -1,
    });
    setCurrentMonth(format(firstdayNextMonth, "MMMM"));

    const validateMonth = format(firstdayNextMonth, "MM");
    if (validateMonth === "01" && button === "next") {
      let firstdayNextYear = add(firstDayCurrentYear, {
        years: 1,
      });
      setCurrentYear(format(firstdayNextYear, "yyyy"));
    }
    if (validateMonth === "12" && button === "prev") {
      let firstdayNextYear = add(firstDayCurrentYear, {
        years: -1,
      });
      setCurrentYear(format(firstdayNextYear, "yyyy"));
    }
  };

  const nextMonthHandler = () => {
    PrevNext("next");
  };

  const prevMonthHandler = () => {
    PrevNext("prev");
  };

  return (
    <div
      className=" w-full shadow-lg rounded-lg overflow-hidden"
      style={{ backgroundColor: "#f5f5f5" }}
      ref={modal}
    >
      <div className="p-3 bg-[#fff] rounded-t">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center w-full justify-between">
            <div className="flex">
              <div className="relative mr-2 border cursor-pointer text-center bg-primary-500 rounded-lg font-bold">
                <span
                  className=" py-1 px-2 inline-block text-[#fff]"
                  onClick={() =>
                    setToggleButton({
                      ...toggleButton,
                      month: !toggleButton.month,
                    })
                  }
                >
                  <p className=" text-white text-2xl uppercase">
                    {currentMonth}
                  </p>
                </span>
                {toggleButton.month && (
                  <MonthDropdown
                    option={Months}
                    currentActive={currentMonth}
                    onClick={(value) => {
                      setCurrentMonth(value);
                      setToggleButton({
                        ...toggleButton,
                        month: false,
                      });
                    }}
                  />
                )}
              </div>
              <div className="relative mr-2 border cursor-pointer text-center bg-primary-500 rounded-lg font-bold">
                <span
                  className=" py-1 px-2 inline-block text-[#fff]"
                  onClick={() =>
                    setToggleButton({
                      ...toggleButton,
                      year: !toggleButton.year,
                    })
                  }
                >
                  <p className=" text-white text-2xl uppercase">{currenYear}</p>
                </span>
                {toggleButton.year && (
                  <YearsDropdown
                    Years={Years}
                    currenYear={currenYear}
                    setCurrentYear={setCurrentYear}
                    setToggleButton={setToggleButton}
                    toggleButton={toggleButton}
                  />
                )}
              </div>
            </div>
            <ul className=" flex gap-5  text-3xl">
              <li onClick={prevMonthHandler}>
                <FaRegArrowAltCircleLeft className=" cursor-pointer hover:text-primary-500 duration-200" />
              </li>
              <div onClick={nextMonthHandler}>
                <FaRegArrowAltCircleRight className=" cursor-pointer hover:text-primary-500 duration-200" />
              </div>
            </ul>
          </div>
        </div>
        <div className=" flex flex-wrap mb-2">
          <div className=" text-[14px] font-medium text-center text-[#757575]  w-[14.28%]">
            S
          </div>
          <div className="text-[14px] font-medium text-center text-[#757575]  w-[14.28%]">
            M
          </div>
          <div className="text-[14px] font-medium text-center text-[#757575]  w-[14.28%]">
            T
          </div>
          <div className="text-[14px] font-medium text-center text-[#757575]  w-[14.28%]">
            W
          </div>
          <div className="text-[14px] font-medium text-center text-[#757575] w-[14.28%]">
            T
          </div>
          <div className="text-[14px] font-medium text-center text-[#757575] w-[14.28%]">
            F
          </div>
          <div className="text-[14px] font-medium text-center text-[#757575] w-[14.28%]">
            S
          </div>
        </div>
        <div className=" flex flex-wrap">
          {days.map((day, index) => (
            <div
              key={index}
              className={` cursor-pointer aspect-square flex justify-center items-center text-base font-medium text-center text-gray-800 w-[14.28%]`}
            >
              <div
                onClick={() => SelectedDateHandler(day)}
                className={twMerge(
                  `w-[90%] flex duration-200 justify-center items-center m-0 aspect-square cursor-pointer text-[14px] rounded-lg hover:bg-primary-400 hover:text-white`,
                  format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd") &&
                    "bg-secondary-500 hover:bg-secondary-500 text-white",
                  appointmentsDate?.includes(format(day, "yyyy-MM-dd")) &&
                    "bg-primary-400 text-white",
                  format(day, "yyyy-MM-dd") === selectedDate &&
                    " bg-primary-500 text-white"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
