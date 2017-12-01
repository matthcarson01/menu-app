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
    return <div>
        <Segment vertical >
          <Container>
            <Menu secondary size="large">
              <Menu.Header>
                <Image src={appLogo} size="tiny" as={Link} to="/" wrapped />
              </Menu.Header>
              <Menu.Item position="right">
                {!this.state.user && <Button as="a" onClick={this.handleLogin} content="Log In" as="a" color="blue" />}
                {this.state.user && <Button as="a" onClick={this.handleLogout} content="Log Out" as="a" inverted color="red" />}
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
      </div>;
  }
}
