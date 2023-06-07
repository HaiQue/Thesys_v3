import { useEffect, useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import ChatWrapper from "../../assets/wrappers/Chat";

const Chat = () => {
  const { thesisComments, getThesisComments, createThesisComment, role } =
    useAppContext();

  const [user, setUser] = useState("");

  const [text, setText] = useState("");

  const [messages, setMessages] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const [student, setStudent] = useState(user.name);
  const [professor, setProfessor] = useState(user.name);

  return (
    <>
      <ChatWrapper>
        <div className="chat">
          {role === "professor" && (
            <div className="users-content">
              <p onClick={() => setUser(user.professor)}>{user.professor}</p>
            </div>
          )}
          {role === "student" && (
            <div className="users-content">
              <p onClick={() => setUser(user.student)}>{user.student}</p>
            </div>
          )}
          <form className="chat-content">
            <p>{user}</p>
            return (
            <div className="flex-row">
              <span className="main-icon">{user.charAt(0)}</span>
              <span>{user.name}</span>
            </div>
            );
            <div className="input-div">
              <input
                className="input-fields"
                type="text"
                id="text"
                value={text}
                onChange={handleTextChange}
              />
              <button
                className="btn btn-chat"
                onClick={() => {
                  setMessages((m) => [...m, text]);
                }}
                type="button"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </ChatWrapper>
    </>
  );
};

export default Chat;
