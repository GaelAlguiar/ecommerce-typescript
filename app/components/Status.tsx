import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface StatusInterfaceProps {
  text: string;
  icon: IconType | LucideIcon;
  bg: string;
  color: string;
}

const StatusInterface: React.FC<StatusInterfaceProps> = ({
  text,
  icon: Icon,
  bg,
  color,
}) => {
  return (
    <div className={`${bg} ${color} px-1 rounded flex items-center gap-1`}>
      {text} <Icon size={18} />
    </div>
  );
};

export default StatusInterface;
