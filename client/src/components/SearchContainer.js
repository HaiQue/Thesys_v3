import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    handleChange,
    searchStatus,
    statusOptions,
    clearFilters,
    sort,
    sortOptions,
  } = useAppContext();

  const [studentClass, setStudentClass] = useState("all");
  const studentClassOptions = [
    "Prif-19/1",
    "Prif-19/2",
    "Prif-19/3",
    "Prif-19/4",
  ];

  const [semester, setSemester] = useState("autumn");
  const semesterOptions = ["autumn", "spring"];

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  const restrictToDateYear = (event) => {
    const selectedDate = new Date(event.target.value);
    const year = selectedDate.getFullYear();

    if (!isNaN(year)) {
      const formattedYear = `${year}-01-01`;
      event.target.value = formattedYear;
    }
  };

  const handleStudentClassChange = (e) => {
    setStudentClass(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  return (
    <Wrapper>
      <form className="form">
        <h3 className="search-form">search form</h3>
        <div className="form-center">
          <FormRow
            labelText="Search Thesis"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="thesis status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={statusOptions.map((option) => {
              return { label: option, value: option };
            })}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions.map((option) => {
              return { label: option, value: option };
            })}
          ></FormRowSelect>
          <div>
            <label className="form-label" htmlFor="yearPicker">
              Select Year:
            </label>
            <input
              type="date"
              className="datepicker"
              id="yearPicker"
              onChange={restrictToDateYear}
            />
          </div>
          <FormRowSelect
            name="class"
            value={studentClass}
            handleChange={handleStudentClassChange}
            list={studentClassOptions.map((option) => {
              return { label: option, value: option };
            })}
          ></FormRowSelect>
          <FormRowSelect
            name="semester"
            value={semester}
            handleChange={handleSemesterChange}
            list={semesterOptions.map((option) => {
              return { label: option, value: option };
            })}
          ></FormRowSelect>
          <div className="clear-filters">
            <button
              className="btn btn-block btn-danger"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              clear filters
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
