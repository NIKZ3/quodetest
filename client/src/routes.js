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
import Questions from "views/Questions.js";
import Exam from "views/Exam.js";

import AdminTestSchedule from "./views/AdminTestSchedule";
import AdminLogin from "./views/AdminLogin";

import AdminResult from "./views/AdminResult";
import SessionActivation from "./views/SessionActivation";
import Codeeditor from "./views/codeeditor";
import userActivation from "./views/userActivation";

var routes = [
    {
        path: "/userActivation",
        name: "userActivation",
        icon: "nc-icon nc-preferences-circle-rotate",
        component: userActivation,
        layout: "/admin",
    },
    {
        path: "/sessionActivation",
        name: "sessionActivation",
        icon: "nc-icon nc-preferences-circle-rotate",
        component: SessionActivation,
        layout: "/admin",
    },
    {
        path: "/exam",
        name: "Exam",
        icon: "nc-icon nc-preferences-circle-rotate",
        component: Exam,
        layout: "/admin",
    },
    {
        path: "/editor",
        name: "editor",
        icon: "nc-icon nc-preferences-circle-rotate",
        component: Codeeditor,
        layout: "/admin",
    },
    {
        path: "/problem-setters",
        name: "Problem Setters",
        icon: "nc-icon nc-preferences-circle-rotate",
        component: Questions,
        layout: "/admin",
    },
    {
        path: "/admin/result",
        name: "Result",
        icon: "nc-icon nc-preferences-circle-rotate",
        component: AdminResult,
        layout: "/admin",
    },
    {
        path: "/login",
        name: "login",
        icon: "nc-icon nc-preferences-circle-rotate",
        component: AdminLogin,
        layout: "/admin",
    },

    {
        path: "/schedule",
        name: "adminschedule",
        icon: "nc-icon nc-preferences-circle-rotate",
        component: AdminTestSchedule,
        layout: "/admin",
    },
];
export default routes;
