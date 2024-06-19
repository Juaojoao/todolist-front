interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CheckBoxComp = ({ ...props }: InputProps) => {
  return (
    <input
      type="checkbox"
      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border
        border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block
        before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-md
        before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-gray-200
        checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
      {...props}
    />
  );
};
