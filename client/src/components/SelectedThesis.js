import moment from "moment";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Thesis";
import ThesisInfo from "./ThesisInfo";

const SelectedThesis = ({
  _id,
  thesis,
  description,
  topicAuthor,
  createdAt,
  status,
}) => {
  let date = moment(createdAt);
  date = moment(createdAt).format("LL");

  return (
    <Wrapper>
      <header>
        <div className="content-center">
          <h5>{thesis}</h5>
          <div className={`status ${status}`}>{status}</div>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <p>{description}</p>
          {/* <ThesisInfo icon={<FaUserCircle />} text={topicAuthor} /> */}
          <ThesisInfo icon={<FaCalendarAlt />} text={date} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SelectedThesis;
