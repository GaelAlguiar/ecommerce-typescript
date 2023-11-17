import { User } from "lucide-react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height="35"
        width="35"
      />
    );
  }
  return <User size={30} className="text-slate-500" />;
};

export default Avatar;
