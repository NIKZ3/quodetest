import React, { Component } from "react";
import AdminTest from "../Containers/AdminHub/AdminTestSchedule";

class AdminTestSchedule extends Component {
    render() {
        let token = localStorage.getItem("token");
        let isAdmin = localStorage.getItem("isAdmin");
        console.log(isAdmin);
        /* if (token === null || isAdmin == "false" || isAdmin === null) {
            alert("You are not authorized");
            this.props.history.replace("/login");
        }*/
        return (
            <div className="content" style={{ marginTop: "75px" }}>
                <AdminTest />
            </div>
        );
    }
}

export default AdminTestSchedule;
