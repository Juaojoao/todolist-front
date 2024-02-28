import { useState } from 'react';

type DropDownButtonProps = {
  textName: string;
  children?: React.ReactNode;
};

export const DropDownButton = ({ textName, children }: DropDownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        id="dropdownDefaultButton"
        onClick={toggleDropDown}
        className="text-gray-500 bg-transparent hover:bg-BlackTheme-card hover:drop-shadow-lg
         button-hover outline-none font-medium 
         rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center cursor-pointer tracking-widest"
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
