import logo from '../assets/images/logo.svg';

const Logo = ({ smaller }) => {
  const logoClassName = smaller ? 'logo smaller' : 'logo';
  return <img src={logo} alt="thesys" className={logoClassName} />;
};

export default Logo;
