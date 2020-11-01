import React from "react";
import axios from "axios";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Label,
    Input,
    Button,
    FormGroup,
} from "reactstrap";

class userActivation extends React.Component {
    state = {
        emailID: "",
        userState: "NO DATA",
    };

    fetchUserHandler = () => {
        console.log(localStorage.getItem("token"));
        axios
            .post(
                "/getUser",
                { emailID: this.state.emailID },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                const data = response.data;

                if (data != null) {
                    if (data == "N") {
                        alert("No such user present");
                    } else {
                        let loginState = "";
                        if (data.loginState == true) loginState = "TRUE";
                        else loginState = "FALSE";
                        this.setState(
                            {
                                emailID: data.emailID,
                                userState: loginState,
                            },
                            () => {
                                console.log(this.state);
                            }
                        );
                    }
                }
            })
            .catch((e) => {
                console.log(e);
                alert("Submission Failed");
            });
    };

    activateHandler = () => {
        axios
            .post(
                "/activateUser",
                { emailID: this.state.emailID },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                console.log("OK");
                alert("Succesful Activation");
            })
            .catch((e) => {
                console.log(e);
                alert("Activation Failed");
            });
    };

    emailChangeHandler = (event) => {
        this.setState({ emailID: event.target.value });
    };

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle style={{ fontSize: 16 }}>
                            USER ACTIVATION HUB
                        </CardTitle>
                        <form>
                            <FormGroup>
                                <Label for="email">User Email ID OR ID</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email or ID"
                                    onChange={(event) =>
                                        this.emailChangeHandler(event)
                                    }
                                />
                            </FormGroup>
                        </form>
                        <Button color="primary" onClick={this.fetchUserHandler}>
                            Fetch User
                        </Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <CardTitle style={{ fontSize: 16 }}>USER</CardTitle>
                        <div>{this.state.emailID}</div>
                        <div>{this.state.userState}</div>

                        <Button color="primary" onClick={this.activateHandler}>
                            ACtivate
                        </Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default userActivation;
