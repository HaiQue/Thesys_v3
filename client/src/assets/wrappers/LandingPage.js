import styled from 'styled-components';

const Wrapper = styled.main`
  .logo {
    width: 35%;
    margin: 0 auto;
    margin-top: 40px;
  }

  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    color: var(--primary-500);
    span {
      color: var(--primary-800);
    }
  }

  p {
    color: var(--grey-600);
  }

  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }

    .main-img {
      width: 110%;
      display: block;
    }

    .login-register {
      display: grid;
      place-items: center;
    }
  }
`;
export default Wrapper;
