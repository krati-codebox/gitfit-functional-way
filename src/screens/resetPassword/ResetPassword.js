import React, { useState, useEffect, useRef } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import { Link } from "react-router-dom";

import { ResetPasswordAction } from "../../redux/actions/resetPassword";
import { Notification } from "../../utils";
import images from "../../assets/images";

const ls = new SecureLS();

export const ResetpassComponent = (props) => {
    const [data, setData] = useState({})
    const refContainer = useRef();
    const { resetPasswordAuth } = useSelector((state) => ({
        resetPasswordAuth: state.resetPasswordAuth,
      }));

  const Dispatch = useDispatch();

  useEffect(()=> {
    if(resetPasswordAuth.status_code === 200){
        ls.set("is_resetuserpassword", true);
        props.history.push("/");
    }
  },[resetPasswordAuth])

    function validateEmail(value) {
        let error;
        if (!value) {
            error = "You can't leave this empty";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = "Invalid email address format";
        }
        return error;
    }

    const handleSubmit = (values) => {
        let data = {
            email: values.email
        };

        console.log("resetPasswordAuth.message", resetPasswordAuth);
        Dispatch(ResetPasswordAction(data));
        Notification("Successfully ", resetPasswordAuth.message, "success");
    };

    return (
        <div>
            <ReactNotification ref={refContainer} />
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/resetpassword">
                        <div className>
                            <img src={images.logo_img} width="100%" alt="logo_image" />
                        </div>
                    </Link>
                    <div className="navbar-header navbar-right">
                        <ul className="nav nav-tabs">
                            <li className="active">
                                <Link to="/">Login</Link>
                            </li>
                            <li>
                                <Link to="/registration">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container reset_page">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">Forgot Password </div>
                            <div className="panel-body">
                                <Formik
                                    initialValues={{
                                        email: ""
                                    }}
                                    onSubmit={handleSubmit}
                                >
                                    {({ errors, touched }) => (
                                        <Form className="form-horizontal" >
                                            <div className="form-group">
                                                <div className="col-md-12">
                                                    <img
                                                        className="email_icon"
                                                        src={images.email_icon}
                                                        alt="email_icon"
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
                                                <div className="col-md-12 text-center">
                                                    <button
                                                        // onClick={handleSubmit}
                                                        type="submit"
                                                        className="btn btn-primary send_password"
                                                    >
                                                        Send Password Reset Link
                                            </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="envolab_img" style={{ display: "block" }}>
                    <img src={images.Envelope_imge.png} width="100%" alt="" />
                </div>
            </div>
        </div>
    )
}