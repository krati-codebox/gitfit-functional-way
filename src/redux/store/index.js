import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
// import promisemiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import loginReducers from "../reducer/login/login";
import logoutReducer from "../reducer/logout/logout";
import registerReducers from "../reducer/register/register";
import resetPasswordReducers from "../reducer/resetPassword/resetPassword";

import confirmPasswordReducers from "../reducer/confirmpassword/confirmpassword";
import atheleteRegisterReducers from "../reducer/atheleteRagisteration/atheleteRagisteration";

const store = combineReducers({
  loginAuth: loginReducers,
  logoutAuth: logoutReducer,
  registerAuth: registerReducers,
  resetPasswordAuth: resetPasswordReducers,
  confirmPasswordAuth: confirmPasswordReducers,
  atheleteRegisterAuth: atheleteRegisterReducers
});

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export default createStoreWithMiddleware(store);