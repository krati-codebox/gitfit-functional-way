import { CONFIRMPASSWORD_API } from "../../actionTypes";
import { ApiBaseUrl, Api } from "../../../utils";

const ConfirmPasswordAction = (data, key) => {
  return (dispatch) => {
    Api.post(`${ApiBaseUrl}api/users/newPassword/` + key + `/`, data)
      .then((response) => {
        dispatch({
          type: CONFIRMPASSWORD_API,
          payload: response,
        });
      })
      .catch((error) => {
        // dispatch({
        //   type: REGISTER_API,
        //   payload: error
        // });
      });
  };
};

export { ConfirmPasswordAction };
