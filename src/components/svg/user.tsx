import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface UserIconProps extends Omit<FontAwesomeIconProps, "icon"> {
  icon?: IconProp;
}

export const UserIcon: React.FC<UserIconProps> = ({
  icon = faUser,
  className,
  ...rest
}) => {
  const iconClassName = className ? `${className} ` : "";
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${iconClassName}${className} w-full text-7xl`}
      {...rest}
    />
  );
};
