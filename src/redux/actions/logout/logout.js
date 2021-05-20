import { LOGOUT_API } from "../../actionTypes/index.js";
import Api from "../../utils/Api/Api.js";
import { ApiBaseUrl } from "../../utils/BaseUrls";

const LogoutAction = () => {
  return dispatch => {
    Api.get(`${ApiBaseUrl}api/logout/`)
      .then(response => {
        window.sessionStorage.clear();
        dispatch({
          type: LOGOUT_API,
          payload: response
        });
      })
      .catch(error => {
        // dispatch({
        // 	type: LOGOUT_API,
        // 	payload: error
        // });
      });
  };
};

export { LogoutAction };
