import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface MailIconProps extends Omit<FontAwesomeIconProps, "icon"> {
  icon?: IconProp;
}

export const MailIcon: React.FC<MailIconProps> = ({
  icon = faEnvelope,
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
