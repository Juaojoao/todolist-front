import { ToolTipComponent } from "../tooltip/tooltip";
import "./styles.css";

interface InputFormProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon: React.ReactNode;
  tooltip?: string;
}
export const InputFormComponent: React.FC<InputFormProps> = ({
  icon,
  tooltip,
  ...rest
}) => {
  return (
    <div
      className={`form-input flex gap-4 items-center border-b border-gray-50 w-full ${rest.className}`}
    >
      {icon}
      <input
        {...rest}
        className={`boder-none bg-transparent outline-none h-12 text-gray-50 w-full ${rest.className}`}
      />
      {tooltip && <ToolTipComponent title={tooltip} />}
    </div>
  );
};
