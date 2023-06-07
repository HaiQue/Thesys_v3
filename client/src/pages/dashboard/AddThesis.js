import {
  FormRow,
  FormRowTextArea,
  FormRowSelect,
  Alert,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useEffect, useState } from "react";
const AddThesis = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    thesis,
    description,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createThesis,
    editThesis,
    users,
    getUsers,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!thesis || !description || !selectedProfessorId) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editThesis();
      return;
    }
    createThesis(selectedProfessorId);
  };

  const [selectedProfessorId, setSelectedProfessorId] = useState(
    users[0]?.userId
  );

  useEffect(() => {
    if (users && users.length > 0) setSelectedProfessorId(users[0].userId);
  }, [users]);

  const handleThesisInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit thesis" : "add thesis"} </h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="thesis"
            value={thesis}
            handleChange={handleThesisInput}
          />
          <FormRowTextArea
            type="text"
            name="description"
            value={description}
            handleChange={handleThesisInput}
          />
          <FormRowSelect
            name="Selected Professor"
            value={selectedProfessorId}
            handleChange={(e) => setSelectedProfessorId(e.target.value)}
            list={users?.map((user) => {
              return { label: user?.name, value: user.userId };
            })}
          />
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear values
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddThesis;
