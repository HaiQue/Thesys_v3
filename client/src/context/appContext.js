import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_THESIS_BEGIN,
  CREATE_THESIS_SUCCESS,
  CREATE_THESIS_ERROR,
  GET_THESES_BEGIN,
  GET_THESES_SUCCESS,
  SET_EDIT_THESIS,
  DELETE_THESIS_BEGIN,
  EDIT_THESIS_BEGIN,
  EDIT_THESIS_SUCCESS,
  EDIT_THESIS_ERROR,
  RESERVE_THESIS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_USERS,
  APPROVE_THESIS,
  GET_STUDENT_THESIS,
  UPLOAD_THESIS_ATTACHMENT,
  GET_THESIS_ATTACHMENTS,
  REVIEW_THESIS,
  CREATE_COMMENT,
  GET_THESIS_COMMENTS,
} from "./actions";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const role = JSON.parse(user)?.role;

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  isEditing: false,
  editThesisId: "",
  thesis: "",
  description: "",
  topicAuthor: "",
  status: "free",
  statusOptions: ["free", "taken", "pending", "declined"],
  role: role ? role : "student",
  roleOptions: ["head-professor", "professor", "student"],
  selectedBy: null,
  theses: [],
  totalTheses: 0,
  numOfPages: 1,
  page: 1,
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  users: [],
  studentThesis: null,
  thesisAttachments: [],
  thesisComments: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const request = axios.create({
    baseURL: "/api/v1",
  });

  // request interceptor
  request.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response interceptor
  request.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await request.patch("/users", currentUser);

      const { user } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createThesis = async (professorId) => {
    dispatch({ type: CREATE_THESIS_BEGIN });
    try {
      const { thesis, description, status } = state;

      await request.post("/theses", {
        thesis,
        description,
        professorId: professorId,
        status,
      });

      dispatch({ type: CREATE_THESIS_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_THESIS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getProfessorTheses = async () => {
    const { page, search, searchStatus, role, sort, user } = state;

    let url = `/theses?page=${page}&status=${searchStatus}&role=${role}&sort=${sort}&professorId=${
      role === "professor" || (role === "head-professor" && user?._id)
        ? user?._id
        : ""
    }`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_THESES_BEGIN });
    try {
      const { data } = await request(url);
      const { theses, totalTheses, numOfPages } = data;
      dispatch({
        type: GET_THESES_SUCCESS,
        payload: {
          theses,
          totalTheses,
          numOfPages,
        },
      });
    } catch (error) {}
    clearAlert();
  };

  const getTheses = async () => {
    const { page, search, searchStatus, role, sort, user } = state;

    let url = `/theses?page=${page}&status=${searchStatus}&role=${role}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_THESES_BEGIN });
    try {
      const { data } = await request(url);
      const { theses, totalTheses, numOfPages } = data;
      dispatch({
        type: GET_THESES_SUCCESS,
        payload: {
          theses,
          totalTheses,
          numOfPages,
        },
      });
    } catch (error) {}
    clearAlert();
  };

  const setEditThesis = (id) => {
    dispatch({ type: SET_EDIT_THESIS, payload: { id } });
  };

  const editThesis = async () => {
    dispatch({ type: EDIT_THESIS_BEGIN });
    try {
      const { thesis, description, topicAuthor, role, status } = state;

      await request.patch(`/theses/${state.editThesisId}`, {
        thesis,
        description,
        topicAuthor,
        role,
        status,
      });
      dispatch({
        type: EDIT_THESIS_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_THESIS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteThesis = async (thesisId) => {
    dispatch({ type: DELETE_THESIS_BEGIN });
    try {
      await request.delete(`/theses/${thesisId}`);
      getTheses();
    } catch (error) {}
  };

  const reserveThesis = async (thesisId) => {
    try {
      const { thesis, description, topicAuthor, role, user } = state;
      const status = "pending";
      const response = await request.post(`/theses/reserve/${thesisId}`, {
        thesis,
        description,
        topicAuthor,
        role,
        selectedBy: user._id,
      });

      dispatch({
        type: RESERVE_THESIS_SUCCESS,
        payload: response.data.thesis,
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: CREATE_THESIS_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getUsers = async () => {
    try {
      const response = await request.get(`/users?role=professor`);

      dispatch({ type: GET_USERS, payload: { users: response.data } });
    } catch (e) {}
  };

  const approveThesis = async (thesisId) => {
    try {
      const response = await request.post(`/theses/approve/${thesisId}`);
      dispatch({ type: APPROVE_THESIS, payload: response.data.thesis });
    } catch (e) {}
  };

  const getStudentThesis = async () => {
    try {
      const response = await request.get(`/theses/${state.user._id}`);
      dispatch({
        type: GET_STUDENT_THESIS,
        payload: response.data.thesis,
      });
    } catch (e) {
      dispatch({
        type: GET_STUDENT_THESIS,
        payload: null,
      });
    }
  };

  const uploadThesisAttachments = async (name, content) => {
    try {
      const response = await request.post(
        `/theses/attachments/${state.studentThesis._id}`,
        { fileName: name, fileContent: content }
      );

      dispatch({
        type: UPLOAD_THESIS_ATTACHMENT,
        payload: { name, content },
      });
    } catch (e) {}
  };

  const getThesisAttachments = async () => {
    try {
      const response = await request.get(
        `/theses/attachments/${state.studentThesis._id}`
      );
      dispatch({
        type: GET_THESIS_ATTACHMENTS,
        payload: response.data.attachments,
      });
    } catch (e) {}
  };

  const reviewThesis = async (thesisId, comment, score) => {
    try {
      const response = await request.post(`/theses/review/${thesisId}`, {
        comment,
        score,
      });
      dispatch({
        type: REVIEW_THESIS,
        payload: response.data,
      });
    } catch (e) {}
  };

  const createThesisComment = async (thesisId, comment) => {
    try {
      const response = await request.post(`/theses/comments/${thesisId}`, {
        comment,
      });
      dispatch({
        type: CREATE_COMMENT,
        payload: response.data,
      });
    } catch (e) {}
  };

  const getThesisComments = async (thesisId) => {
    try {
      const response = await request.get(`/theses/comments/${thesisId}`);
      dispatch({
        type: GET_THESIS_COMMENTS,
        payload: response.data,
      });
    } catch (e) {}
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createThesis,
        getTheses,
        setEditThesis,
        editThesis,
        deleteThesis,
        reserveThesis,
        approveThesis,
        clearFilters,
        changePage,
        getUsers,
        getProfessorTheses,
        getStudentThesis,
        uploadThesisAttachments,
        getThesisAttachments,
        reviewThesis,
        createThesisComment,
        getThesisComments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
