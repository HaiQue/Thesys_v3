import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { LogoWhite } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <LogoWhite />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Thesis <span>management</span> app
          </h1>
          <p>
            The thesis management system helps to facilitate the organization
            and management of the thesis writing process from topic selection to
            evaluation.
          </p>
          <div className="login-register">
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
        </div>
        <img src={main} alt="thesis" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

export default Landing;
