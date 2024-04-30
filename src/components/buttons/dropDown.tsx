import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useRef, useState } from 'react';
import './style.css';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';

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
  const dropDownRef = useRef(null);

  useClickOutside({ ref: dropDownRef, callback: () => setIsOpen(false) });

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative"
      onClick={useStopPropagation().stopPropagation}
      {...props}
      ref={dropDownRef}
    >
      <div
        id="dropdownDefaultButton"
        onClick={toggleDropDown}
        className="text-gray-500 bg-transparent hover:bg-BlackTheme-card hover:drop-shadow-lg
         button-hover outline-none font-medium flex justify-center items-center
         rounded-lg text-lg py-1 px-2 text-center cursor-pointer tracking-widest"
      >
        {textName}
      </div>
      <div
        id="dropdown"
        className={`dropdown-content bg-BlackTheme-list rounded-lg border border-gray-600 drop-shadow-md ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};
