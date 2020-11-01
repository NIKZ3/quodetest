import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Label,
    Input,
    Button,
} from "reactstrap";
import axios from "axios";
class SessionActivation extends Component {
    state = {
        SessionID: [],
    };
    sessionData = [];

    activateHandler = (i) => {
        axios
            .post(
                "/sessionActivation",
                { SessionID: this.state.SessionID[i] },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((reponse) => {
                alert("successful Activation");
            })
            .catch((e) => {
                alert("Error");
            });
    };

    componentDidMount() {
        axios
            .get("/getMySessions", {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response);
                this.setState({ SessionID: response.data });
            })
            .catch((e) => {
                console.log(e);
                alert("Error");
            });
    }

    render() {
        for (let i in this.state.SessionID) {
            this.sessionData.push(
                <Card>
                    <CardBody>
                        <CardTitle style={{ fontSize: 16 }}>
                            SessionID : {this.state.SessionID[i]}
                        </CardTitle>
                        <Button
                            color="primary"
                            onClick={() => this.activateHandler(i)}
                        >
                            Activate Test
                        </Button>
                    </CardBody>
                </Card>
            );
        }

        return <div>{this.sessionData}</div>;
    }
}

export default SessionActivation;
