import { createAction, handleActions } from "redux-actions";

/** action types */
const SET_FIELD = "auth/SET_FIELD";
const RESET_FORM = "auth/RESET_FORM";
const SET_USER = "auth/SET_USER";
const LOGOUT = "auth/LOGOUT";
const savedUser = JSON.parse(localStorage.getItem("user") || "null");
const USER_LS_KEY = "LV_USER";

/** action creators */
export const setField = createAction(
  SET_FIELD,
  ({ form, key, value }) => ({ form, key, value })
);

export const resetForm = createAction(RESET_FORM, (form) => form);
export const setUser = (found) => ({ type: SET_USER, payload: found });
export const logout = createAction(LOGOUT);

function loadUser() {
  try {
    const raw = localStorage.getItem(USER_LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** initial state */
const initialState = {
  login: { id: "", password: "" },
  register: { id: "", email: "", password: "", passwordConfirm: "", intro: "" },
  user: loadUser(),
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

    [SET_USER]: (state, { payload }) => {
      if (payload) localStorage.setItem("user", JSON.stringify(payload));
      else localStorage.removeItem("user");
      return { ...state, user: payload };
    },

    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),

      },
  initialState
);

export default auth;
