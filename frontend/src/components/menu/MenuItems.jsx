import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faRectangleList,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

const MenuItem = ({ faIcon, text }) => {
  return (
    <div className="flex h-6 w-full items-center">
      <FontAwesomeIcon icon={faIcon} className="text-2xl" />
      <div className="ml-3 font-normal">{text}</div>
    </div>
  );
};

const MenuItems = () => {
  return (
    <div className="flex flex-col space-y-6">
      <MenuItem faIcon={faBell} text="Notifications" />
      <MenuItem faIcon={faEnvelope} text="Messages" />
      <MenuItem faIcon={faUser} text="Profile" />
      <MenuItem faIcon={faRectangleList} text="Settings" />
    </div>
  );
};

export default MenuItems;
