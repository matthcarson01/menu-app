import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Button, Container, Menu, Image, Segment } from "semantic-ui-react";
import appLogo from './genericLogo.png';
import "./HeaderBar.css";

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state ={user:null};
    this.handleLogout=this.handleLogout.bind(this);
  }
  handleLogin() {
    window.location.href = "http://localhost:3001/login";
  }
  handleLogout() {
    window.location.href = "http://localhost:3001/logout";
  }
    componentWillMount() {
    axios.get("/api/me").then(response => {
      if (!response.data)
        this.setState({
          user: null
        });
      else this.setState({ user: response.data });
    });
  }
  render() {
    let showButton = this.props.showButton;
    return(
        <nav className="barShadow">
          <Image src={appLogo} as={Link} to="/" wrapped className="logo" />
          {!this.state.user && showButton && <Button as="a" onClick={this.handleLogin} content="Log In/Sign Up" as="a" color="blue" style={{ width: "10rem", height: "2.25rem" }} />}
          {this.state.user && showButton && <Button as="a" onClick={this.handleLogout} content="Log Out" as="a" inverted color="red" style={{ width: "6rem", height: "2.25rem" }} />}
        </nav>
    )
  }
}
