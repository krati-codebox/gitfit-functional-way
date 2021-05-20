import { LOGIN_API } from "../../actionTypes";
import { ApiBaseUrl, Api } from "../../../utils";

const LoginApi = data => {
  return dispatch => {
    Api.post(`${ApiBaseUrl}api/login/`, data)
      .then(response => {
        dispatch({
          type: LOGIN_API,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_API,
          payload: error
        });
      });
  };
};

export { LoginApi };
