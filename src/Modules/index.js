import { combineReducers } from "redux";
import login from "./login";
import modal from "./modal";
import user from "./user";

const rootReducer = combineReducers({ login, modal, user });

export default rootReducer;
