const MonthDropdown = ({
  option,
  currentActive,
  onClick,
}: {
  option: string[];
  currentActive: string;
  onClick: (value: string) => void;
}) => {
  return (
    <ul className="absolute top-[103%] shadow-md left-0 bg-white w-[15rem] overflow-auto">
      {option.map((month, index) => (
        <li
          key={index}
          style={{
            width: "100%",
            marginBottom: "0",
          }}
          className={`py-1 px-2 text-[12px] border-b w-full cursor-pointer hover:bg-primary-400 hover:text-white ${
            currentActive === month
              ? " bg-primary-500 text-white"
              : "text-[#757575]"
          }`}
          onClick={() => {
            onClick(month);
          }}
        >
          <p className=" text-lg">{month}</p>
        </li>
      ))}
    </ul>
  );
};

export default MonthDropdown;
