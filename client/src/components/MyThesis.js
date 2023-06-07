import { useState, useEffect } from "react";
import moment from "moment";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Thesis";
import ThesisInfo from "./ThesisInfo";
import { FormRow, FormRowSelect } from ".";

const MyThesis = ({
  _id,
  thesis,
  description,
  professorId,
  createdAt,
  status,
  isReviewed,
  reviewScore,
  reviewComment,
}) => {
  const {
    reserveThesis,
    setEditThesis,
    deleteThesis,
    role,
    user,
    approveThesis,
    reviewThesis,
  } = useAppContext();
  let date = moment(createdAt);
  date = moment(createdAt).format("LL");

  const [text, setText] = useState("");
  const [number, setNumber] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleNumberChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 && inputValue <= 10) {
      setNumber(inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && number) {
      reviewThesis(_id, text, number);
    }
  };

  return (
    <>
      <Wrapper>
        <header>
          <div className="content-center">
            <h5>{thesis}</h5>
            <div className={`status ${status}`}>{status}</div>
            {role === "student" && status === "free" && (
              <button
                type="button"
                className="btn btn-reserve"
                onClick={() => reserveThesis(_id)}
              >
                reserve
              </button>
            )}

            {user._id === professorId && status === "pending" && (
              <div className="action">
                <Link
                  to="/add-thesis"
                  onClick={() => approveThesis(_id)}
                  className="btn edit-btn"
                >
                  approve
                </Link>
              </div>
            )}
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <p>{description}</p>
            {/* <ThesisInfo icon={<FaUserCircle />} text={topicAuthor} /> */}
            <ThesisInfo icon={<FaCalendarAlt />} text={date} />
          </div>
          <footer>
            <div>
              {role === "head-professor" && (
                <div className="action">
                  <Link
                    to="/add-thesis"
                    onClick={() => setEditThesis(_id)}
                    className="btn edit-btn"
                  >
                    Edit
                  </Link>
                </div>
              )}
              {role === "head-professor" && (
                <div className="action">
                  <button
                    type="button"
                    className="btn delete-btn"
                    onClick={() => deleteThesis(_id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </footer>
        </div>
      </Wrapper>
      <Wrapper>
        {(role === "professor" || role === "head-professor") && (
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label className="" htmlFor="text">
                  Comments:
                </label>
                <input
                  className="input-fields"
                  type="text"
                  id="text"
                  value={text}
                  onChange={handleTextChange}
                />
              </div>
              <div>
                <label htmlFor="number">Final result:</label>
                <input
                  className="input-fields"
                  type="number"
                  id="number"
                  value={number}
                  min="1"
                  max="10"
                  onChange={handleNumberChange}
                />
              </div>
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}

        <div className="reviews">
          {reviewScore !== 0 && <h5>review score: {reviewScore}</h5>}
          {reviewComment && <p>Review Comment: {reviewComment}</p>}
        </div>
      </Wrapper>
    </>
  );
};

export default MyThesis;
