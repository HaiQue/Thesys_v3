import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);

  .logo {
    display: flex;
    align-items: center;
    width: 176px;
  }

  .nav-center {
    display: flex;
    width: 95vw;
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  background: var(--white);
  .btn-container {
    position: relative;
  }

  .btn {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 96%;
    }
  }
`;
export default Wrapper;
