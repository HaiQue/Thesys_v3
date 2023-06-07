import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

const Navbar = () => {
  const { toggleSidebar, logoutUser } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
