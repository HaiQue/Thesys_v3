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
  UPLOAD_THESIS_ATTACHMENT as UPLOAD_THESIS_ATTACHMENTS,
  GET_THESIS_ATTACHMENTS,
  REVIEW_THESIS,
  CREATE_COMMENT,
  GET_THESIS_COMMENTS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      role: action.payload.user.role,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated",
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return { ...state, page: 1, [action.payload.name]: action.payload.value };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editThesisId: "",
      thesis: "",
      description: "",
      topicAuthor: "",
      status: "free",
    };

    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_THESIS_BEGIN) {
    return {
      ...state,
      isEditing: true,
    };
  }

  if (action.type === CREATE_THESIS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Thesis Created",
    };
  }

  if (action.type === CREATE_THESIS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_THESES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_THESES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      theses: action.payload.theses,
      totalTheses: action.payload.totalTheses,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_THESIS) {
    const thesisObj = state.theses.find(
      (thesisObj) => thesisObj._id === action.payload.id
    );
    const { _id, thesis, description, topicAuthor, status } = thesisObj;
    return {
      ...state,
      isEditing: true,
      editThesisId: _id,
      thesis,
      description,
      topicAuthor,
      status,
    };
  }

  if (action.type === EDIT_THESIS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_THESIS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Thesis Updated",
    };
  }
  if (action.type === EDIT_THESIS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_THESIS_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === RESERVE_THESIS_SUCCESS) {
    const updatedTheses = state.theses.map((thesis) => {
      if (thesis._id === action.payload._id) {
        return {
          ...action.payload,
          selectedBy: state.user._id,
        };
      }
      return thesis;
    });

    return {
      ...state,
      isLoading: false,
      showAlert: true,
      theses: updatedTheses,
      alertType: "success",
      alertText: "Thesis selected",
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === GET_USERS) {
    return {
      ...state,
      users: action.payload.users,
    };
  }

  if (action.type === APPROVE_THESIS) {
    return {
      ...state,
      theses: state.theses.map((thesis) =>
        thesis._id === action.payload._id ? action.payload : thesis
      ),
    };
  }

  if (action.type === GET_STUDENT_THESIS) {
    return {
      ...state,
      studentThesis: action.payload,
    };
  }

  if (action.type === UPLOAD_THESIS_ATTACHMENTS) {
    return {
      ...state,
      thesisAttachments: [...state.thesisAttachments, action.payload],
    };
  }

  if (action.type === GET_THESIS_ATTACHMENTS) {
    return {
      ...state,
      thesisAttachments: action.payload,
    };
  }

  if (action.type === REVIEW_THESIS) {
    return {
      ...state,
      theses: state.theses.map((thesis) =>
        thesis._id === action.payload._id ? action.payload : thesis
      ),
    };
  }

  if (action.type === CREATE_COMMENT) {
    return {
      ...state,
      thesisComments: action.payload,
    };
  }

  if (action.type === GET_THESIS_COMMENTS) {
    return {
      ...state,
      thesisComments: action.payload,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
