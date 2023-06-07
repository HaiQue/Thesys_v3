import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  margin-bottom: 1rem;

  .results {
    margin-top: 4rem;
  }

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    align-items: center;
  }

  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }

  h5 {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  p {
    text-align: center;
    margin: 0;
    color: var(--grey-500);
    letter-spacing: var(--letterSpacing);
  }

  .pending {
    background: #fcefc7;
    color: #e9b949;
  }

  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }

  .free {
    background: #c7f0ff;
    color: #357fad;
  }

  .taken {
    background: #ffd3d3;
    color: #c34a4a;
  }

  .btn-reserve {
    background: #c7fcc7;
    color: #34b834;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }

  .btn-reserve:hover {
    background: #64f564;
    color: #206b20;
  }

  .content {
    padding: 1rem 1.5rem;
  }

  .status,
  .pending,
  .declined,
  .free,
  .taken,
  .btn-reserve {
    margin-top: 0.5rem;
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }

  .content-center {
    margin: 0 auto;
    display: grid;
    place-items: center;
  }

  footer {
    margin-top: 1rem;
  }

  .edit-btn,
  .delete-btn {
    text-align: center;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
    width: 100px;
  }

  .edit-btn {
    background: #e0e8f9;
    color: #647acb;
  }

  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }

  .action {
    margin: 1rem auto;
    display: grid;
    place-items: center;
  }

  /* &:hover .actions {
    visibility: visible;
  } */
`;

export default Wrapper;
