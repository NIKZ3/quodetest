import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardTitle, Col, Row } from "reactstrap";
import { FormGroup, Label, Input } from "reactstrap";
import { Button } from "reactstrap";
import axios from "axios";

class QuestionSubmissionHub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nOptions: 0,
            options: [],
            optioncnt: 0,
            optionForm: [],
            correctAns: -1,
            update: false,
            question: "",
        };
    }

    /******NOTE: Submit button will directly send the Question to Backend *********/
    //TODO: Add Axios Request to SUbmit the answer
    onSubmitHandler = () => {
        if (this.state.correctAns === -1) {
            alert("Please Select Correct Answer");
        } else {
            axios
                .post(
                    "/admin/submitQuestion",
                    {
                        question: this.state.question,
                        options: this.state.options,
                        ans: this.state.correctAns,
                    },
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    alert("Question submitted successfully");

                    const tempState = {
                        nOptions: 0,
                        options: [],
                        optioncnt: 0,
                        optionForm: [],
                        correctAns: -1,
                        update: false,
                        question: "",
                    };

                    this.setState(tempState);
                    console.log("success");
                })
                .catch((e) => {
                    alert("Network Error");
                    console.log(e);
                });
        }
    };

    questionChangeHandler = (event) => {
        let q = event.target.value;

        this.setState({ question: q });
    };

    optionOnChangeHandler = (i, event) => {
        let options = this.state.options;
        options[i].value = event.target.value;

        this.setState({ options: options, update: true });
    };

    addOptionHandler(e) {
        this.setState((prevState) => {
            let options = this.state.options;
            options.push({
                value: "",
            });
            return {
                nOptions: prevState.nOptions + 1,
                options: options,
                update: true,
            };
        });
    }

    componentDidUpdate() {
        let data = [];
        if (this.state.update) {
            for (let i = 0; i < this.state.nOptions; i++) {
                data.push(
                    <FormGroup key={i}>
                        <Label
                            style={{
                                width: "7%",
                                marginLeft: 0,
                                marginRight: 0,
                                textAlign: "center",
                            }}
                            for={"option"}
                        >
                            OPTION {i + 1}
                        </Label>

                        <Input
                            type="text"
                            name="option"
                            id={"option-" + (i + 1)}
                            placeholder={`Option - ${i + 1}`}
                            value={this.state.options[i].value}
                            onChange={(event) =>
                                this.optionOnChangeHandler(i, event)
                            }
                            style={{
                                width: "75%",
                                display: "inline",
                                marginLeft: 0,
                                marginRight: 0,
                            }}
                        />
                        <Button
                            color={this.state.correctAns == i ? "success" : ""}
                            style={{
                                paddingLeft: 10,
                                display: "inline",
                                marginBottom: 13,
                                marginLeft: 0,
                                marginRight: 0,
                                width: "18%",
                            }}
                            onClick={(e) => {
                                this.setState({ correctAns: i, update: true });
                            }}
                        >
                            {this.state.correctAns == i
                                ? "Correct Answer"
                                : "Select Correct Answer"}
                        </Button>
                    </FormGroup>
                );
            }
            this.setState({ optionForm: data, update: false });
        }
    }

    render() {
        let op = [];
        op.push(
            <FormGroup>
                <Label for="question">Question</Label>
                <Input
                    type="text"
                    name="question"
                    id="question"
                    placeholder="Enter Question"
                />
            </FormGroup>
        );

        return (
            <React.Fragment>
                <Card style={{ margin: "20px" }}>
                    <CardBody>
                        <CardTitle>Enter A Question</CardTitle>
                        <form>
                            <FormGroup>
                                <Label for="question">Question</Label>
                                <Input
                                    type="text"
                                    name="question"
                                    id="question"
                                    placeholder="Enter Question"
                                    onChange={(event) =>
                                        this.questionChangeHandler(event)
                                    }
                                />
                            </FormGroup>
                            {this.state.optionForm}

                            <Button
                                color="primary"
                                onClick={(e) => this.addOptionHandler(e)}
                            >
                                Add Options
                            </Button>
                        </form>
                    </CardBody>
                </Card>
                <Button
                    onClick={this.onSubmitHandler}
                    style={{ margin: "20px" }}
                    color="primary"
                >
                    SUBMIT QUESTION
                </Button>
            </React.Fragment>
        );
    }
}

export default QuestionSubmissionHub;
