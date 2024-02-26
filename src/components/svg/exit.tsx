import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface MailIconProps extends Omit<FontAwesomeIconProps, "icon"> {
    icon?: IconProp;
}

export const ExitIcon: React.FC<MailIconProps> = ({
    icon = faRightFromBracket,
    className,
    ...rest
}) => {
    const iconClassName = className ? `${className} ` : "";
    return (
        <FontAwesomeIcon
            icon={icon}
            className={`${iconClassName}`}
            {...rest}
        />
    );
};
