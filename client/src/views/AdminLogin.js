import React, { Component } from "react";
import Login from "../Containers/Login";
import axios from "axios";
import { Redirect } from "react-router";

class AdminLogin extends Component {
    state = {
        email: "",
        password: "",
        redirect: 0,
        testType: 0,
        userState: "",
    };

    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value });
    };

    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
    };

    changeHandler = () => {
        console.log("works");
    };

    //TODO:- Route to question page or route to admin page
    onSubmitHandler = () => {
        if (this.state.email === "" || this.state.password === "") {
            alert("ENTER EMAIL AND PASSWORD");
        } else {
            axios
                .post("/login", {
                    emailID: this.state.email,
                    password: this.state.password,
                })
                .then((response) => {
                    if (response.data.token !== undefined) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("isAdmin", response.data.isAdmin);

                        const testType1 = response.data.testType;
                        this.setState(
                            {
                                redirect: 1,
                                testType: response.data.testType,
                                userState: response.data.state,
                            },

                            () => {
                                localStorage.removeItem("state");
                            }
                        );
                    } else {
                        alert("login denied");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    alert("Something went wrong");
                });
        }
    };

    onSubmitHandlerAdmin = () => {
        if (this.state.email === "" || this.state.password === "") {
            alert("ENTER EMAIL AND PASSWORD");
        } else {
            axios
                .post("/admin/login", {
                    emailID: this.state.email,
                    password: this.state.password,
                })
                .then((response) => {
                    if (response.data.token !== undefined) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("isAdmin", response.data.isAdmin);

                        //  const testType1 = response.data.testType;
                        this.setState(
                            {
                                redirect: 1,
                            },

                            () => {
                                localStorage.removeItem("state");
                            }
                        );
                    } else {
                        alert("login denied");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    alert("Something went wrong");
                });
        }
    };

    /*redirectState;
    componentDidUpdate() {}*/

    render() {
        let isAdmin = localStorage.getItem("isAdmin");

        if (this.state.redirect === 1 && isAdmin === "true") {
            return <Redirect to="/admin/schedule" />;
        } else if (
            this.state.redirect == 1 &&
            isAdmin == "false" &&
            this.state.testType == "quiz"
        ) {
            return <Redirect from="admin/login" to="/admin/exam" />;
        } else if (
            this.state.redirect == 1 &&
            isAdmin == "false" &&
            this.state.testType == "code"
        ) {
            return (
                <Redirect
                    from="admin/login"
                    to={{
                        pathname: "/admin/editor",
                    }}
                />
            );
        } else {
            return (
                <div className="content" style={{ margin: "75px" }}>
                    <Login
                        name="ADMIN LOGIN"
                        onSubmitHandler={this.onSubmitHandler}
                        onSubmitHandlerAdmin={this.onSubmitHandlerAdmin}
                        emailChangeHandler={(event) =>
                            this.emailChangeHandler(event)
                        }
                        passwordChangeHandler={(event) =>
                            this.passwordChangeHandler(event)
                        }
                    />
                </div>
            );
        }
    }
}

export default AdminLogin;
