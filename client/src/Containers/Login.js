import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import { Button } from "reactstrap";

class Login extends Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.name}</CardHeader>
                <CardBody>
                    <form>
                        <FormGroup>
                            <Label for="email">Email address</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email"
                                onChange={this.props.emailChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.props.passwordChangeHandler}
                            />
                        </FormGroup>
                        <Button
                            color="primary"
                            onClick={this.props.onSubmitHandler}
                        >
                            USER
                        </Button>
                        <Button
                            color="primary"
                            onClick={this.props.onSubmitHandlerAdmin}
                        >
                            ADMIN
                        </Button>
                    </form>
                </CardBody>
            </Card>
        );
    }
}

export default Login;
