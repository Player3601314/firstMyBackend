import { createContext, useReducer, useEffect } from "react";

let token = ""

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("token")) || token,
};

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      window.location.reload()
      return {
        ...state,
        currentUser: action.payload,
      };

    case "LOGOUT": {
      localStorage.removeItem("token")
      localStorage.setItem("token", JSON.stringify(token))
      window.location.reload()
      return {
        currentUser: token
      };
    }
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
