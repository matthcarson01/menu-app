import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout=this.handleLogout.bind(this);
  }
  handleLogout() {
    window.location.href = "http://localhost:3001/logout"
  }
  render() {
    return <header className="main-header">
        <nav className="main-nav">
          <i className="fa fa-cutlery fa-2x" aria-hidden="true" />
          <button  onClick={this.handleLogout} className="pure-button pure-button-primary">
            Log Out
          </button>
        </nav>
      </header>;
  }
}
