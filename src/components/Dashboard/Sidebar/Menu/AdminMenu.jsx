import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="All Users"
        address="manageUsers"
      />
      <MenuItem icon={MdHomeWork} label="All Articles" address="allArticles" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Add Publisher"
        address="addPublisher"
      />
    </>
  );
};

export default AdminMenu;
