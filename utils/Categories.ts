import { GiSmartphone, GiWatch } from "react-icons/gi";
import { PiDesktopTower } from "react-icons/pi";
import { IoTvSharp } from "react-icons/io5";
import { MdLaptopChromebook } from "react-icons/md";
import { BsKeyboardFill } from "react-icons/bs";
import { LiaStoreAltSolid } from "react-icons/lia";

export const categories = [
  {
    label: "All",
    icon: LiaStoreAltSolid,
  },
  {
    label: "Phone",
    icon: GiSmartphone,
  },
  {
    label: "Laptop",
    icon: MdLaptopChromebook,
  },
  {
    label: "Desktop",
    icon: PiDesktopTower,
  },
  {
    label: "Watch",
    icon: GiWatch,
  },
  {
    label: "Tv",
    icon: IoTvSharp,
  },
  {
    label: "Accessories",
    icon: BsKeyboardFill,
  },
];
