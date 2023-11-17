import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface AdminNavItemProos {
  selected?: boolean;
  icon: IconType | LucideIcon;
  label: string;
}

const AdminNavItem: React.FC<AdminNavItemProos> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-700 transition cursor-pointer ${
        selected
          ? "border-b-slate-700 text-slate-700"
          : "border-transparent text-slate-500"
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break normal">
        {label}
      </div>
    </div>
  );
};

export default AdminNavItem;
