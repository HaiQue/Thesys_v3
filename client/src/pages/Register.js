import { useState, useEffect } from "react";
import { Logo, FormRow, FormRowSelect, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  role: "student",
  isMember: true,
};

const Register = () => {
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    setupUser,
    role,
    roleOptions,
  } = useAppContext();

  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChanges(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, password, isMember, role } = values;

    if (!email || !password || (!isMember && !name && !lastName && !role)) {
      displayAlert();
      return;
    }

    const currentUser = { name, lastName, email, password, role };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful. Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created. Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChanges}
          />
        )}
        {!values.isMember && (
          <FormRow
            labelText="Last Name"
            type="text"
            name="lastName"
            value={values.lastName}
            handleChange={handleChanges}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChanges}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChanges}
        />
        {!values.isMember && (
          <FormRowSelect
            name="role"
            value={values.role}
            handleChange={handleChanges}
            list={roleOptions.map((option) => {
              return { label: option, value: option };
            })}
          ></FormRowSelect>
        )}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
