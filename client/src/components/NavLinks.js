import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const NavLinks = ({ toggleSidebar }) => {
  const { role } = useAppContext();

  return (
    <div className="nav-links">
      {links
        .filter((link) => !link.roles || link.roles?.find((r) => r === role))
        .map((link) => {
          const { text, path, id, icon } = link;

          return (
            <NavLink
              to={path}
              key={id}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
    </div>
  );
};
export default NavLinks;
