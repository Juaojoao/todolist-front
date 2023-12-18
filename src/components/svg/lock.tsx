import { faLock } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface LockIconProps extends Omit<FontAwesomeIconProps, "icon"> {
  icon?: IconProp;
}

export const LockIcon: React.FC<LockIconProps> = ({
  icon = faLock,
  className,
  ...rest
}) => {
  const iconClassName = className ? `${className} ` : "";
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${iconClassName}${className}`}
      {...rest}
    />
  );
};
