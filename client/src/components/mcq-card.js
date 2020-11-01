import React from "react";
import { Card, CardBody, CardTitle, CardText, Label, Input } from "reactstrap";

class McqCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    updateQuestion() {
        this.options = [];
        this.props.question.options.forEach((opt) => {
            this.options.push(
                <div className="form-check-radio" key={opt.id}>
                    <Label
                        className="form-check-label"
                        style={{ color: "#000" }}
                    >
                        <Input
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            checked={
                                this.props.selectedOption == opt.id
                                    ? true
                                    : false
                            }
                            value={opt.id}
                            onChange={(e) => {
                                this.props.handleOptions(e, this.props._id); //this.props.sequence
                            }}
                        />
                        {opt.option}
                        <span
                            className="form-check-sign"
                            style={{ color: "black" }}
                        ></span>
                    </Label>
                </div>
            );
        });
    }
    render() {
        this.updateQuestion();
        return (
            <Card>
                <CardBody>
                    <CardTitle style={{ fontSize: 16 }}>
                        Q{this.props.sequence + 1}. {this.props.question.q}
                    </CardTitle>
                    <div
                        style={{ fontSize: 16, color: "#000", marginLeft: 25 }}
                    >
                        {this.options}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default McqCard;
