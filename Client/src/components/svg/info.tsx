interface svgProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

export const InfoSvg = ({ ...props }: svgProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="w-6"
    >
      <path
        fill={props.fill || 'currentColor'}
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 
        0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 
        0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 
        1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
      />
    </svg>
  );
};
