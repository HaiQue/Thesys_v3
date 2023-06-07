import styled from "styled-components";

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }

  .search-form {
    margin-bottom: 1rem;
    text-align: center;
  }

  .clear-filters {
    margin-top: 1rem;
  }

  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }

  h5 {
    font-weight: 700;
  }

  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }

  .datepicker {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
