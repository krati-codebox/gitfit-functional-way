import { REGISTER_API } from "../../actionTypes";
import { ApiBaseUrl, Api } from "../../../utils";

const RegisterAction = data => {
  return dispatch => {
    Api.post(`${ApiBaseUrl}api/register/`, data)
      .then(response => {
        
        dispatch({
          type: REGISTER_API,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: REGISTER_API,
          payload: error
        });
      });
  };
};

export { RegisterAction };
