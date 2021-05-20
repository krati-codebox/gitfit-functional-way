import {RESETPASSWORD_API} from '../../actionTypes';
import { ApiBaseUrl, Api } from "../../../utils";

const ResetPasswordAction = data => {
  console.log("response>>>", data);
  return dispatch => {
    Api.post(`${ApiBaseUrl}api/users/forget/`, data)
      .then (response => {
        dispatch ({
          type: RESETPASSWORD_API,
          payload: response,
        });
      })
      .catch (error => {
        // dispatch({
        //   type: REGISTER_API,
        //   payload: error
        // });
      });
  };
};

export {ResetPasswordAction};
