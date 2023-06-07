import styled from "styled-components";

const Wrapper = styled.main`
  /* form {
    text-align: center;
    margin-top: 3rem;
  }

  form * {
    margin-top: 10px;
    margin-bottom: 10px;
  } */

  .form {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  form div {
    margin: 10px 10px;
    flex: 1;
    display: flex;
    align-items: center;
  }

  form label {
    width: 100px;
  }

  form input[type="text"],
  form input[type="number"] {
    flex: 1;
    width: 100%;
  }

  .input-fields {
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }

  .reviews {
    margin-bottom: 1rem;
  }
`;
export default Wrapper;
