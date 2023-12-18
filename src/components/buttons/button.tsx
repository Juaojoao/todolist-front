interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className=" h-10 flex justify-center items-center border border-gray-50 w-full rounded-md bg-transparent text-gray-50 leading-10 hover:bg-gray-600 transition duration-300 ease-in-out shadow-xl shadow-gray-900"
    >
      {children}
    </button>
  );
};
