import moment from "moment";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Thesis";
import ThesisInfo from "./ThesisInfo";

const Thesis = ({
  _id,
  thesis,
  description,
  professorId,
  createdAt,
  status,
}) => {
  const {
    reserveThesis,
    setEditThesis,
    deleteThesis,
    role,
    user,
    approveThesis,
  } = useAppContext();
  let date = moment(createdAt);
  date = moment(createdAt).format("LL");

  return (
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
  );
};

export default Thesis;
