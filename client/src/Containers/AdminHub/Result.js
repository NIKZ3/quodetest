import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { Button } from "reactstrap";
import axios from "../../axios";
import { FormGroup, Label, Input, FormText } from "reactstrap";

class Result extends Component {
    state = {
        sessionID: "",
        result: [
            { user: "ngawade911@gmail.com", score: 100 },
            { user: "ngawade911@gmail.com", score: 100 },
        ],
    };

    // TODO : Axios request to import result of particular result
    componentDidMount() {}

    getResult = () => {
        if (this.state.sessionID === "") {
            alert("Please Enter SessionID");
        } else {
            const params = new URLSearchParams([
                ["sessionID", this.state.sessionID],
            ]);
            axios
                .get("/result", { params })
                .then((response) => {
                    const data = response.data.testResultData.data;
                    const tempResult = [];

                    for (let i in data) {
                        tempResult.push({
                            user: data[i].emailID,
                            score: data[i].score,
                        });
                    }

                    this.setState({ result: tempResult });
                })
                .catch((e) => {
                    alert("Network Error");
                    console.log(e);
                });
        }
    };

    sidChangeHandler = (event) => {
        this.setState(
            { sessionID: event.target.value },
            console.log(this.state)
        );
    };

    render() {
        let result = [];
        for (let i = 0; i < this.state.result.length; i++) {
            result.push(
                <Card key={i}>
                    <CardBody>
                        <CardTitle>{this.state.result[i].user}</CardTitle>
                        <CardText>{this.state.result[i].score}</CardText>
                    </CardBody>
                </Card>
            );
        }

        return (
            <div style={{ margin: "75px" }}>
                <Card>
                    <CardBody>
                        <FormGroup>
                            <Label for="sessionID">SESSIONID</Label>
                            <Input
                                type="sessionID"
                                name="sessionID"
                                id="sessionID"
                                placeholder="Enter SessionID"
                                onChange={(event) =>
                                    this.sidChangeHandler(event)
                                }
                            />
                        </FormGroup>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={this.getResult}
                        >
                            Submit
                        </Button>
                    </CardBody>
                </Card>

                {result}
            </div>
        );
    }
}

export default Result;
