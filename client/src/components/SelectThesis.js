import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import SelectedThesis from "./SelectedThesis";
import Wrapper from "../assets/wrappers/ThesesContainer";
import PageBtnContainer from "./PageBtnContainer";

const SelectThesis = () => {
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
    userId,
  } = useAppContext();

  useEffect(() => {
    getTheses();
    // eslint-disable-next-line
  }, [search, searchStatus, searchType, sort, page]);

  if (isLoading) {
    return <Loading center />;
  }

  const myTheses = theses.filter(
    (thesis) =>
      thesis.selectedBy === userId &&
      ["pending", "taken", "declined"].includes(thesis.status)
  );

  if (myTheses.length === 0) {
    return (
      <Wrapper>
        <h2>No theses to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="theses">
        {myTheses.map((thesis) => {
          return <SelectedThesis key={thesis._id} {...thesis} />;
        })}
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default SelectThesis;
