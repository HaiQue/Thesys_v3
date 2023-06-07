import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Thesis from "./Thesis";
import Wrapper from "../assets/wrappers/ThesesContainer";
import PageBtnContainer from "./PageBtnContainer";

const ThesesContainer = () => {
  const {
    getTheses,
    theses,
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    const delayForTyping = setTimeout(() => {
      getTheses();
    }, 400);
    return () => clearTimeout(delayForTyping);
    // eslint-disable-next-line
  }, [search, searchStatus, searchType, sort, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (theses.length === 0) {
    return (
      <Wrapper>
        <h2>No theses to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="theses">
        {theses.map((thesis) => {
          return <Thesis key={thesis._id} {...thesis} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default ThesesContainer;
