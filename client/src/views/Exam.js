import React from "react";
import McqCard from "components/mcq-card";
import { Button, Col } from "reactstrap";
import axios from "axios";
//axios.defaults.withCredentials = true;
// reactstrap components

class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nQuestions: 3,
            questions: [
                {
                    id: 1,
                    q: "Who let the dogs out?",
                    options: [
                        {
                            id: 1,
                            option: "a",
                        },
                        {
                            id: 2,
                            option: "b",
                        },
                        {
                            id: 3,
                            option: "c",
                        },
                        {
                            id: 4,
                            option: "d",
                        },
                    ],
                },
                {
                    id: 3,
                    q: "Who let the dogs out?",
                    options: [
                        {
                            id: 1,
                            option: "ab",
                        },
                        {
                            id: 2,
                            option: "bb",
                        },
                        {
                            id: 3,
                            option: "cb",
                        },
                        {
                            id: 4,
                            option: "db",
                        },
                    ],
                },
                {
                    id: 2,
                    q: "How you doin'?",
                    options: [
                        {
                            id: 1,
                            option: "aa",
                        },
                        {
                            id: 2,
                            option: "bb",
                        },
                        {
                            id: 3,
                            option: "cc",
                        },
                        {
                            id: 4,
                            option: "dd",
                        },
                    ],
                },
            ],
            answers: [],
            qCount: 1,
            time: 65,
        };
        let ans = [];
        this.mcqs = [];

        this.questionButtons = [];
        this.state.questions.forEach((q) => {
            this.state.answers.push({
                id: q.id,
                ans: -1,
            });
        });

        this.timerHandler = setInterval(() => {
            this.setState((prevState) => {
                return {
                    time: prevState.time - 1,
                };
            });
        }, 1000);

        this.handleOptions = this.handleOptions.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.changeQCount = this.changeQCount.bind(this);
    }

    changeQCount(count) {
        this.setState({ qCount: count });
    }

    handleOptions(event, _id) {
        let optId = event.target.value;
        let options = this.state.answers;
        options[_id] = optId;
        // console.log();
        this.setState({ answers: options });
    }
    handleButtonClick(itr) {
        this.setState((prevState) => {
            return { qCount: prevState.qCount + itr };
        });
    }
    updateTime() {
        this.setState((prevState) => {
            return {
                time: prevState.time - 1,
            };
        });
    }

    functionSetInitialState = (tempState) => {
        this.setState(tempState, () => {
            console.log("This no request", tempState);

            console.log(tempState);
            for (let i = 1; i <= this.state.nQuestions; i++) {
                this.questionButtons.push(
                    <Button
                        className="mr-1 bg-primary"
                        onClick={(e) => {
                            this.changeQCount(i);
                        }}
                    >
                        {i}
                    </Button>
                );
            }
        });
    };

    functionSubmit = () => {
        axios
            .post(
                "/user/submit",
                { answers: this.state.answers },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                alert("Submission Success");
                localStorage.clear();
                this.props.history.replace("/admin/login");
            })
            .catch((e) => {
                console.log(e);
                alert("Submission Failed");
            });
    };

    //
    componentDidMount() {
        axios
            .get("/user/questions", {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                if (response.data.userState == "N") {
                    const data = response.data;
                    alert("Please note down the sessionID:" + data.sessionID); //!SessionID
                    const tempState = {};
                    tempState.questions = data.questions;
                    tempState.nQuestions = data.nQuestions;
                    tempState.qCount = 1;
                    tempState.time = 50;
                    tempState.answers = {};

                    for (let i = 0; i < tempState.nQuestions; i++) {
                        let _id = tempState.questions[i]._id;
                        tempState.answers[_id] = -1;
                    }

                    this.setState(tempState, () => {
                        console.log(this.state);

                        for (let i = 1; i <= this.state.nQuestions; i++) {
                            this.questionButtons.push(
                                <Button
                                    className="mr-1 bg-primary"
                                    onClick={(e) => {
                                        this.changeQCount(i);
                                    }}
                                >
                                    {i}
                                </Button>
                            );
                        }
                    });
                } else {
                    console.log("IN");
                    const data = response.data;
                    alert("Please note down the sessionID:" + data.sessionID); //!SessionID
                    const tempState = {};
                    tempState.questions = data.questions;
                    tempState.nQuestions = data.nQuestions;
                    console.log(data.userState);
                    const userState = JSON.parse(data.userState);
                    tempState.qCount = userState.qCount;
                    tempState.time = userState.time;
                    tempState.answers = userState.answers;

                    this.setState(tempState, () => {
                        for (let i = 1; i <= this.state.nQuestions; i++) {
                            this.questionButtons.push(
                                <Button
                                    className="mr-1 bg-primary"
                                    onClick={(e) => {
                                        this.changeQCount(i);
                                    }}
                                >
                                    {i}
                                </Button>
                            );
                        }
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                alert("You might not be logged in");
                this.props.history.replace("/login");
            });
    }

    componentDidUpdate() {
        const userState = Object.assign({}, this.state);
        delete userState.questions;
        if (this.state.time % 5 == 0) {
            axios
                .post(
                    "/stateSave",
                    { state: userState },
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

        if (this.state.time === 0) {
            this.setState({ time: -1 });
            clearInterval(this.timerHandler);
            // TODO: Submit automatically

            this.functionSubmit();
        }
    }

    render() {
        let _id = this.state.questions[this.state.qCount - 1]._id;

        //
        return (
            <>
                <div className="content">
                    <div>
                        <h5>
                            <span
                                className={
                                    this.state.time < 60
                                        ? "text-danger"
                                        : "text-info"
                                }
                            >
                                {Math.floor(this.state.time / 60) < 10
                                    ? "0"
                                    : null}
                                {Math.floor(this.state.time / 60)}:
                                {Math.floor(this.state.time % 60) < 10
                                    ? "0"
                                    : null}
                                {Math.floor(this.state.time % 60)}
                            </span>
                        </h5>
                    </div>
                    <div>{this.questionButtons}</div>
                    <McqCard
                        question={this.state.questions[this.state.qCount - 1]}
                        _id={this.state.questions[this.state.qCount - 1]._id}
                        sequence={this.state.qCount - 1}
                        selectedOption={parseInt(this.state.answers[_id])} //When state returned from database everything gets converted to string
                        handleOptions={this.handleOptions}
                    />
                    <div style={{ float: "right" }}>
                        <span
                            className={
                                this.state.qCount == 1 ? "d-none" : "d-inline"
                            }
                        >
                            <Button
                                className="bg-primary ml-2 "
                                style={{ width: 120 }}
                                onClick={(e) => {
                                    this.handleButtonClick(-1);
                                }}
                            >
                                Previous
                            </Button>
                        </span>
                        <span
                            className={
                                this.state.qCount == this.state.nQuestions
                                    ? "d-none"
                                    : "d-inline"
                            }
                        >
                            <Button
                                className="bg-primary ml-2"
                                style={{ width: 120 }}
                                onClick={(e) => {
                                    this.handleButtonClick(1);
                                }}
                            >
                                Next
                            </Button>
                        </span>
                    </div>
                    <Button
                        className="bg-primary ml-2"
                        style={{ width: 120 }}
                        onClick={(e) => {
                            this.functionSubmit();
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </>
        );
    }
}

export default Exam;
