type ButtonRedProps = {
  children: React.ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
};

export const ButtonGreen = ({ children, buttonProps }: ButtonRedProps) => {
  return (
    <button
      {...buttonProps}
      className="before:ease relative h-full py-1 px-3 rounded-md overflow-hidden border border-green-500
       bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 
       before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 
       before:duration-700  hover:before:-translate-x-40"
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
