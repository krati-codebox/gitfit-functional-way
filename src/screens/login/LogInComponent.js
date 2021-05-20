import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
// import { loadReCaptcha, ReCaptcha } from "react-recaptcha-google";
import SecureLS from "secure-ls";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { LoginApi } from "../../redux/actions/login";
import { ApiBaseUrl, Api, Notification } from "../../utils";
import images from "../../assets/images";

const ls = new SecureLS();

export const LogInComponent = (props) => {
  let captcha;
  const [rememberMe, setRememberMe] = useState(false);
  const [value, setValue] = useState(false);
  const [isUserSelectCaptcha, setIsUserSelectCaptcha] = useState(false);
  const [subscriptionData, setsubscriptionData] = useState([]);
  const { loginAuth } = useSelector((state) => ({
    loginAuth: state.loginAuth,
  }));
  const Dispatch = useDispatch();
  const refContainer = useRef();

  const handleSubmit = (values) => {
    console.log(values);
    let data = {
      email: values.email,
      password: values.password,
    };
    verifyCallback();
    Dispatch(LoginApi(data));

    ls.set("is_logged_in", true);
    if (rememberMe) {
      let savedData = { email: values.email, password: values.password };
      localStorage.setItem("SU", JSON.stringify(savedData));
    } else {
      localStorage.removeItem("SU");
    }
  };
// console.log("jkkkkkkkkkkkkk",Formik.values)
  const showSubscriptionType = (login_count) => {
    let token = ls.get("auth_token");

    if (token !== null && ls.get("is_coach") === true) {
      Api.get(`${ApiBaseUrl}api/subscriptiontype`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((response) => {
        if (response !== undefined) {
          // if (
          //   (response[0] && response[0].is_subscribed === true) ||
          //   (response[1] && response[1].is_subscribed === true) ||
          //   (response[2] && response[2].is_subscribed === true) ||
          //   (response[3] && response[3].is_subscribed === true)
          // ) {
          //   this.props.history.push("/coach/dashboard");
          // } else {
          //   this.props.history.push("/subscriptions", { state: response });
          // }

          // let check = JSON.parse(window.sessionStorage.getItem("is_tour_done"));
          let check = login_count;
          if (check > 1) {
            props.history.push("/coach/dashboard");
          } else {
            props.history.push("/subscriptions", { state: response });
          }
        }
      });
    } else {
      props.history.push("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("SU") !== null) {
      // let { data } = this.state;
      let savedData = JSON.parse(localStorage.getItem("SU"));

      // data["email"]["value"] = savedData.email;
      // data["email"]["validation"] = true;
      // data["password"]["value"] = savedData.password;
      // data["password"]["validation"] = true;
      // this.setState({ data, rememberMe: true });
    }
    if (ls.get("is_logged_out") === true) {
      Notification("Login", "Now Please Login", "success");
      
      ls.set("is_logged_out", false);
    }

    if (ls.get("is_registered") === true) {
      Notification("Successfully Registered", "Now Please Login", "success");
      ls.set("is_registered", false);
    }

    if (ls.get("is_resetpassword") === true) {
      Notification("Successfully Changed Password", "Now Please Login Again", "success");
      ls.set("is_resetpassword", false);
    }

    if (ls.get("is_resetuserpassword") === true) {
      Notification("Reset Link Send to Your Mail", "Please Check Your Mail to Reset Your Password", "success");
      ls.set("is_resetuserpassword", false);
    }
    
    if (ls.get("is_athelete_registered") === true) {
      Notification("Successfully Registered", "Now Please Login", "success");
      ls.set("is_athelete_registered", false);
    }
    // loadReCaptcha();
  }, []);

  const setCaptchaRef = (ref) => {
    if (ref) {
      return captcha = ref;
    }
 }

  //recaptcha function
  const onLoadRecaptcha = () => {
    if (captcha) {
      captcha.reset();
    }
  };

  const verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    if (recaptchaToken) {
      setValue(!value);
    } else {
      setValue(value);
    }
  };

  useEffect(() => {
    console.log("loginn",loginAuth)
    if (loginAuth !== "" && loginAuth.status_code === undefined) {
      ls.set("auth_token", loginAuth.auth_token);

      localStorage.setItem(
        "full_name",
        loginAuth.first_name + " " + loginAuth.last_name
      );
      if (loginAuth.is_coach === true) {
        ls.set("is_coach", true);
        ls.set("user_id", loginAuth.id);
        console.log("loginAuth.is_coach", loginAuth.is_coach);
        showSubscriptionType(loginAuth.login_count);
      } else {
        ls.set("is_coach", false);
        ls.set("athelete_id", loginAuth.id);
      }
    } else if (loginAuth.status_code === 400) {
      Notification("Error", loginAuth.message, "danger");
    } else {
      let message = loginAuth.message;
      Notification("Error", message, "danger");
    }
    return () => {
      //
    };
  }, [loginAuth]);

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "You can't leave this empty";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address format";
    }

    return error;
  }

  const remember_Me = (e) => {
    setRememberMe(e.target.checked);
  };

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "You can't leave this empty";
    } else if (value.length < 3) {
      error = "Password must be 3 characters at minimum";
    }
    return error;
  }

  return (
    <div>
      <ReactNotification ref={refContainer} />
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            <div>
              <img src={images.logo_img} width="100%" alt="logo" />
            </div>
          </Link>
          <div className="navbar-header navbar-right">
            <ul className="nav nav-tabs">
              <li>
                <Link to="/registration">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container login_page">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-body loginboxmobile">
                <h1>Hello,</h1>
                <p>Get started with us...</p>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="form-horizontal">
                      <div className="form-group">
                        <div className="col-md-12 nopadd">
                          <img
                            className="email_icon"
                            src={images.email_icon}
                            alt="email_icon"
                          />

                          <Field
                            name="email"
                            placeholder="Email"
                            className={`form-control ${
                              touched.email && errors.email ? "is-invalid" : ""
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
                      <br/>
                      <div className="form-group">
                        <div className="col-md-12 nopadd">
                          <img
                            className="email_icon"
                            src={images.Password_icon}
                            alt="Password_icon"
                          />

                          <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={`form-control ${
                              touched.password && errors.password
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
                        {/* <p>Please Verify Captcha before Login</p> */}
                        {/* <ReCaptcha
                          ref={(r) => setCaptchaRef(r) }
                          size="normal"
                          data-theme="dark"
                          render="explicit"
                          sitekey="6LcAm7UUAAAAAAiFz62d2XiE51jexNSfnLzSfPSh"
                          onloadCallback={onLoadRecaptcha}
                          verifyCallback={verifyCallback}
                        /> */}
                        <div className="col-md-12">
                          <div className="checkbox check_box">
                            <label>
                              <input
                                type="checkbox"
                                name="remember"
                                className="input_opacity"
                                onChange={remember_Me}
                                checked={rememberMe}
                              />{" "}
                              Remember Me
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-group mobile_formgroup">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                          <button
                            type="submit"
                            id="LoginButton"
                            className="btn btn-primary"
                            // disabled={!this.state.value}
                          >
                            LogIn
                          </button>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 text-right">
                          <Link to="/resetpassword" className="btn btn-link">
                            Forgot Password?
                          </Link>
                        </div>
                      </div>

                      <div
                        className={isUserSelectCaptcha ? "red-border" : ""}
                      />
                    </Form>
                  )}
                </Formik>
                <div className="login_footer">
                  <p>
                    By Login, you agree to accept the{" "}
                    <span>
                      <Link to="/termsofservices">Terms of services</Link>{" "}
                    </span>{" "}
                    &amp;{" "}
                    <span>
                      <Link to="/privacypolicy">Privacy Policy</Link>{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="envolab_img" style={{ display: "block" }}>
          <img src={images.Envelope_imge} width="100%" alt="Envelope_imge" />
        </div>
      </div>
    </div>
  );
};
