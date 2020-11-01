/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";
import QuestionSubmissionHub from "../Containers/QuestionSubmissionHub/QuestionSubmissionHub";

class Questions extends React.Component {
    render() {
        let token = localStorage.getItem("token");
        let isAdmin = localStorage.getItem("isAdmin");
        console.log(isAdmin);
        if (token === null || isAdmin == "false" || isAdmin === null) {
            alert("You are not authorized");
            this.props.history.replace("/login");
        }

        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <QuestionSubmissionHub />
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Questions;
