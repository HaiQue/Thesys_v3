import styled from "styled-components";

const Wrapper = styled.aside`
  /* height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; */

  .chat {
    /* flex: 1; */
    min-height: 325px;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  span {
    letter-spacing: var(--letterSpacing);
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  .main-icon {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: row;
    place-items: center;
    align-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1rem;
    /* font-weight: 700; */
    text-transform: uppercase;
    color: var(--white);
    padding: 0 9px;
    margin-right: 1rem;
  }

  .users-content,
  .chat-content {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 1rem 1rem;
  }

  .users-content {
    width: 30%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .chat-content {
    width: 70%;
    /* display: flex; */
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .input-div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .input-fields {
    width: 80%;
    padding: 0.3rem 0;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }

  .btn-chat {
    width: calc(20% - 10px);
  }

  p {
    text-align: center;
    /* margin: 0; */
    color: var(--grey-500);
    letter-spacing: var(--letterSpacing);
  }

  @media (min-width: 992px) {
    /* display: none; */
  }
`;
export default Wrapper;
