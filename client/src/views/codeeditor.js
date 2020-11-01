import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import axios from "axios";
import {
    Button,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Label,
    Input,
} from "reactstrap";
import { data } from "jquery";
const code = `
WRITE CODE HERE 

`;

class Codeeditor extends React.Component {
    state = { code: code, question: "", output: "", time: 30 };

    timerHandler = setInterval(() => {
        this.setState(
            (prevState) => {
                return {
                    time: prevState.time - 1,
                };
            },
            () => {
                localStorage.setItem("state", JSON.stringify(this.state));
            }
        );
    }, 1000);

    componentDidUpdate() {
        if (this.state.time === 0) {
            this.setState({ time: -1 });
            clearInterval(this.timerHandler);
            // TODO: Submit automatically

            this.onSubmitHandler();
        }
        if (this.state.time % 5 == 0) {
            axios
                .post(
                    "/stateSave",
                    { state: this.state },
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    if (response.data == "cheat") {
                        this.setState({ time: -1 });
                        clearInterval(this.timerHandler);
                        this.onSubmitHandler();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    componentDidMount() {
        // console.log("OK", this.props.location.state);

        let token = localStorage.getItem("token");
        let isAdmin = localStorage.getItem("isAdmin");

        if (token === null || isAdmin == "true" || isAdmin === null) {
            alert("You are not authorized");
            this.props.history.replace("/login");
        } else {
            // this.setState(this.props.location.state, () => {
            axios
                .get("/getQuestion", {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    if (response.data.userState != "N") {
                        const userState = JSON.parse(response.data.userState);
                        this.setState({
                            question: response.data.question.q,
                            time: userState.time,
                            code: userState.code,
                            output: userState.output,
                        });
                        alert("Start the Test");
                    } else {
                        this.setState({
                            question: response.data.question.q,
                        });
                        alert("Start the Test");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    alert("Question Fetch Failed");
                });
            // });
        }
    }
    onSubmitHandler = () => {
        axios
            .post(
                "/submitCode",
                { code: this.state.code },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                alert("Submission Success");
                const data = response.data;
                const dataString = JSON.stringify(data);
                this.setState({ output: dataString });

                if (this.state.time === -1) {
                    alert("Time UP");
                    localStorage.clear();
                    this.props.history.replace("/admin/login");
                }
            })
            .catch((e) => {
                console.log(e);
                alert("Submission Failed");
            });
    };

    render() {
        return (
            <div>
                <div>
                    <h5>
                        <span
                            className={
                                this.state.time < 60
                                    ? "text-danger"
                                    : "text-info"
                            }
                        >
                            {Math.floor(this.state.time / 60) < 10 ? "0" : null}
                            {Math.floor(this.state.time / 60)}:
                            {Math.floor(this.state.time % 60) < 10 ? "0" : null}
                            {Math.floor(this.state.time % 60)}
                        </span>
                    </h5>
                </div>
                <Card>
                    <CardBody>
                        <CardTitle style={{ fontSize: 16 }}>Question</CardTitle>
                        {this.state.question}
                    </CardBody>
                </Card>

                <Editor
                    value={this.state.code}
                    onValueChange={(code) => this.setState({ code })}
                    highlight={(code) => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
                <Button
                    className="mr-1 bg-primary"
                    onClick={this.onSubmitHandler}
                >
                    Submit
                </Button>

                <Card>
                    <CardBody>
                        <CardTitle style={{ fontSize: 16 }}>
                            TestCase Outputs
                        </CardTitle>
                        {this.state.output}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Codeeditor;
