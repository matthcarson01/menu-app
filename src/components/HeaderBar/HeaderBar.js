import React, { Component } from "react";
import { Button, Container, Menu, Icon, Segment } from "semantic-ui-react";
import "./HeaderBar.css";

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout=this.handleLogout.bind(this);
  }
  handleLogout() {
    window.location.href = "http://localhost:3001/logout"
  }
  render() {
    return <div>
        <Segment textAlign="Center" vertical className="HeaderBar">
          <Container>
            <Menu inverted secondary size="large">
              <Menu.Header>
                <Icon name="food" size="huge" />
              </Menu.Header>
              <Menu.Item position="right">
                <Button color="red" as="a" onClick={this.handleLogout} content="Log Out" as="a"  />
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
      </div>;
  }
}
