type ButtonRedProps = {
  children: React.ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export const ButtonRed = ({ children, buttonProps }: ButtonRedProps) => {
  return (
    <button
      {...buttonProps}
      className="text-red hover:before:bg-redborder-red-500 rounded-md relative
      overflow-hidden border border-red-500 bg-transparent px-3 text-red-500 shadow-2xl 
      transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 
      before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500
       hover:text-white hover:before:left-0 hover:before:w-full"
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
