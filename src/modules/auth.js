import { createAction, handleActions } from "redux-actions";

/** action types */
const SET_FIELD = "auth/SET_FIELD";
const RESET_FORM = "auth/RESET_FORM";
const SET_USER = "auth/SET_USER";
const LOGOUT = "auth/LOGOUT";

/** action creators */
export const setField = createAction(
  SET_FIELD,
  ({ form, key, value }) => ({ form, key, value })
);

export const resetForm = createAction(RESET_FORM, (form) => form);
export const setUser = createAction(SET_USER, (user) => user);
export const logout = createAction(LOGOUT);


/** initial state */
const initialState = {
  login: {
    id: "",
    password: "",
  },
  register: {
    id: "",
    email: "",
    password: "",
    passwordConfirm: "",
    intro: "",
  },
};

/** reducer */
const auth = handleActions(
  {
    [SET_FIELD]: (state, { payload: { form, key, value } }) => ({
      ...state,
      [form]: {
        ...state[form],
        [key]: value,
      },
    }),

    [RESET_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),

    [SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),

    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),

      },
  initialState
);

export default auth;
