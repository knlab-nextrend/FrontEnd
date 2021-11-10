import { combineReducers } from "redux";
import login from "./login";
import modal from "./modal";

const rootReducer = combineReducers({ login, modal });

export default rootReducer;
