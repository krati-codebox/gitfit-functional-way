import { ATHELETE_RAGISTER_API } from "../../actionTypes";
import { ApiBaseUrl, Api } from "../../../utils";

const AtheleteRegisterAction = data => {
  
  return dispatch => {
    Api.post(`${ApiBaseUrl}api/signup/athlete/`, data)
      .then(response => {
        
        dispatch({
          type: ATHELETE_RAGISTER_API,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: ATHELETE_RAGISTER_API,
          payload: error
        });
      });
  };
};

export { AtheleteRegisterAction };
