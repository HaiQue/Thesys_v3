import { MdQueryStats } from "react-icons/md";
import { BiBookBookmark } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { FaWpforms } from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";

const links = [
  {
    id: 1,
    text: "All Thesis",
    path: "all-theses",
    icon: <MdQueryStats />,
    roles: ["professor", "head-professor", "student"],
  },
  {
    id: 2,
    text: "Add Thesis",
    path: "add-thesis",
    icon: <BiBookBookmark />,
    roles: ["professor", "head-professor"],
  },
  {
    id: 3,
    text: "My Thesis",
    path: "my-thesis",
    icon: <FaWpforms />,
    roles: ["student"],
  },
  {
    id: 3,
    text: "My Theses",
    path: "my-theses",
    icon: <FaWpforms />,
    roles: ["professor", "head-professor"],
  },
  {
    id: 4,
    text: "My Profile",
    path: "profile",
    icon: <ImProfile />,
    roles: ["professor", "head-professor", "student"],
  },
  {
    id: 5,
    text: "Chat",
    path: "chat",
    icon: <BsFillChatFill />,
    roles: ["professor", "head-professor", "student"],
  },
];

export default links;
