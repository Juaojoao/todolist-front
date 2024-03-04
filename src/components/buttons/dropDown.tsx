import { useState } from 'react';

type DropDownButtonProps = {
  textName: string;
  children?: React.ReactNode;
  props?: React.HTMLProps<HTMLDivElement>;
};

export const DropDownButton = ({
  textName,
  children,
  props,
}: DropDownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" {...props}>
      <div
        id="dropdownDefaultButton"
        onClick={toggleDropDown}
        className="text-gray-500 bg-transparent hover:bg-BlackTheme-card hover:drop-shadow-lg
         button-hover outline-none font-medium flex justify-center items-center
         rounded-lg text-lg py-1 px-2 text-center cursor-pointer tracking-widest"
      >
        {textName}
      </div>
      {isOpen && (
        <div
          id="dropdown"
          className="drop-shadow-lg z-10 p-2 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 right-0"
        >
          {children}
        </div>
      )}
    </div>
  );
};
