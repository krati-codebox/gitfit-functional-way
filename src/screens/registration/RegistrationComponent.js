import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useDispatch, useSelector } from "react-redux";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-google";
import SecureLS from "secure-ls";

import { RegisterAction } from "../../redux/actions/signup";
import { ApiBaseUrl, Api, Notification } from "../../utils";
import images from "../../assets/images";

const ls = new SecureLS();

export const RegistrationComponent = (props) => {
  let captcha;

  const [value, setValue] = useState(false);
  const [referral_code, setreferral_code] = useState("");
  const [email, setEmail] = useState("");
  const [acceptApi, setacceptApi] = useState([]);
  const refContainer = useRef();
  const { registerAuth } = useSelector((state) => ({
    registerAuth: state.registerAuth,
  }));
  const Dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      console.log("values", values.password, values.confirmPassword);
      Notification("Error", "Confirm Password is not matching.", "danger");
      return false;
    } else {
      console.log("iff values", values);
      let data;
      if (referral_code) {
        data = {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          referral_code: referral_code,
          is_coach: "True",
        };
      } else {
        data = {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          is_coach: "True",
        };
      }
      //calling from redux
      verifyCallback();
      Dispatch(RegisterAction(data));
      ls.set("is_registered", true);
    }
  };

  const acceptInviteApi = () => {
    let key = props.match.params.key;
    if (!key) {
      return;
    }

    Api.get(`${ApiBaseUrl}api/accept/coach/` + key)
      .then((response) => {
        setacceptApi(response);
        setreferral_code(key);
        setEmail(response.email);

        if (response.status_code === 200) {
          Notification("Success", response.message, "success");
        } else if (response.status_code === 400) {
          Notification("Error", response.message, "danger");
        }
      })
      .catch((error) => {
        Notification("Error", error.message, "danger");
      });
  };

  useEffect(() => {
    loadReCaptcha();
    acceptInviteApi();
  }, []);

  const handleLogin = () => {
    props.history.push("/");
  };

  function validatefirstName(value) {
    let error;
    if (!value) {
      error = "You can't leave this empty";
    }
    return error;
  }

  function validatelastName(value) {
    let error;
    if (!value) {
      error = "You can't leave this empty";
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "You can't leave this empty";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address format";
    }

    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "You can't leave this empty";
    } else if (value.length < 5) {
      error =
        "Short passwords are easy to guess. Try one with atleast 8 characters";
    }
    return error;
  }

  const verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    if (recaptchaToken) {
      setValue(!value);
    } else {
      setValue(value);
    }
  };

  const setCaptchaRef = (ref) => {
    if (ref) {
      return (captcha = ref);
    }
  };

  //recaptcha function
  const onLoadRecaptcha = () => {
    if (captcha) {
      captcha.reset();
    }
  };

  useEffect(() => {
    console.log("registerAuth>>>>", registerAuth);
    if (
      // registerAuth &&
      registerAuth !== "" &&
      registerAuth.status_code === undefined
    ) {
      if (registerAuth.auth_token) {

        props.history.push("/");
        Notification("Success", "Register successfully", "success");
      }
    } else if (registerAuth.status_code === 400) {
      Notification("Error", registerAuth.message, "danger");
      console.log("registerAuth.message");
    } else {
      // let message = loginAuth.message;
      // Notification("Error", message, "danger");
    }
    // return () => {
    //   //
    // };
  }, []);

  return (
    <div>
      <ReactNotification ref={refContainer} />
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <a href="/registration" className="navbar-brand">
            <div className>
              <img src={images.logo_img} width="100%" alt="logo_img" />
            </div>
          </a>
          <div className="navbar-header navbar-right">
            <ul className="nav nav-tabs">
              <li className="active">
                <a onClick={handleLogin}>Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container register_page">
        {/* Show alert after sucesfully register */}
        <div className="alert alert-success myregister hide">
          <strong>Success!</strong> User Successfully Registered!
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-default">
              <h1>Hello,</h1>
              <div className="panel-heading">
                Register to join us as a coach.
              </div>
              <div className="panel-body">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="form-horizontal">
                      <div className="form-group">
                        <div className="col-md-12 ">
                          <img
                            className="email_icon"
                            src={images.user_icon}
                            alt=""
                          />
                          <Field
                            name="firstName"
                            placeholder="First Name"
                            className={`form-control ${touched.firstName && errors.firstName
                                ? "is-invalid"
                                : ""
                              }`}
                            validate={validatefirstName}
                          />
                          <ErrorMessage
                            component="div"
                            name="firstName"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-md-12 ">
                          <img
                            className="email_icon"
                            src={images.user_icon}
                            alt=""
                          />
                          <Field
                            name="lastName"
                            placeholder="Last Name"
                            className={`form-control ${touched.lastName && errors.lastName
                                ? "is-invalid"
                                : ""
                              }`}
                            validate={validatelastName}
                          />
                          <ErrorMessage
                            component="div"
                            name="lastName"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-md-12 ">
                          <img
                            className="email_icon"
                            src={images.email_icon}
                            alt=""
                          />
                          <Field
                            name="email"
                            placeholder="Email"
                            className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                              }`}
                            validate={validateEmail}
                          />
                          <ErrorMessage
                            component="div"
                            name="email"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12 ">
                          <img
                            className="email_icon"
                            src={images.Password_icon}
                            alt=""
                          />
                          <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={`form-control ${touched.password && errors.password
                                ? "is-invalid"
                                : ""
                              }`}
                            validate={validatePassword}
                          />
                          <ErrorMessage
                            component="div"
                            name="password"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-md-12 ">
                          <img
                            className="email_icon"
                            src={images.Password_icon}
                            alt=""
                          />
                          <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            className={`form-control ${touched.confirmPassword && errors.confirmPassword
                                ? "is-invalid"
                                : ""
                              }`}
                            validate={validatePassword}
                          />
                          <ErrorMessage
                            component="div"
                            name="confirmPassword"
                            className="invalid-feedback"
                          />
                        </div>

                        <p>Please Verify Captcha before Register</p>

                        <ReCaptcha
                          ref={(r) => setCaptchaRef(r)}
                          size="normal"
                          data-theme="dark"
                          render="explicit"
                          sitekey="6LcAm7UUAAAAAAiFz62d2XiE51jexNSfnLzSfPSh"
                          onloadCallback={onLoadRecaptcha}
                          verifyCallback={verifyCallback}
                        />
                      </div>
                      <div className="form-group">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                          <button
                            type="submit"
                            id="LoginButton"
                            className="btn btn-primary"
                            disabled={!value}
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <p className="alert alert-warning">
                *If you are an athlete please check your email for an invitation
                to join your coach's team
              </p>
            </div>
          </div>
        </div>
        <div className="envolab_img" style={{ display: "block" }}>
          <img src={images.Envelope_imge} width="100%" alt="" />
        </div>
      </div>
    </div>
  );
};
