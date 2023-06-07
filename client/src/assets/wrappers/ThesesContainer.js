import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 1rem;
  h2 {
    text-transform: none;
  }

  & > h5 {
    text-align: center;
    font-weight: 700;
    margin: 1rem;
  }

  .theses {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
export default Wrapper;
