import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="sideBar-ctr">
          <div className="sidebar">
            <label htmlFor="nav-toggle" className="close-on-sm">
              <span className="las la-times"></span>
            </label>
            <div className="sidebar-brand">
              <h2>
                <span
                  className="las la-clinic-medical"
                  style={{ fontSize: "32px" }}
                ></span>
                <span>LiraUni</span>
              </h2>
            </div>
            <div className="sidebar-menu">
              <ul>
                <li>
                  <Link to="/">
                    <span
                      className={`${
                        this.props.active === "dashboard" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-home"></span>
                      <span>Dashboard</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/departments">
                    <span
                      className={`${
                        this.props.active === "depts" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-user-plus"></span>
                      <span>Departments</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/rooms">
                    <span
                      className={`${
                        this.props.active === "rooms" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-home"></span>
                      <span>Rooms</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/exams">
                    <span
                      className={`${
                        this.props.active === "exams" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-comment"></span>
                      <span>Exams</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Nav;
