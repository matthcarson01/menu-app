import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { Grid, Icon, Menu, Segment } from "semantic-ui-react";

import HeaderBar from '../HeaderBar/HeaderBar';
import Profile from '../Profile/Profile';
import Restaurant from '../Restaurant/Restaurant';
import RestaurantMenu from "../RestaurantMenu/RestaurantMenu";
import './UserProfile.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "user" };
    this.handleItemClick = this.handleItemClick.bind(this);
 
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
 componentDidMount(){
    switch (this.props.location.pathname) {
      case "/user/menu":
        this.setState({ activeItem: "menu" });
        break;
      case "/user/restaurant":
        console.log("I ran restaurant");
        this.setState({ activeItem: "restaurant" });
        break;
      case "/user/user-profile":
        this.setState({ activeItem: "user" });
    }
  }
  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <HeaderBar />
        <Menu attached="top">
          <Menu.Header>
            <Icon name="wrench" size="big" />User Settings
          </Menu.Header>
        </Menu>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name="user"
                as={Link}
                to="user-profile"
                active={activeItem === "user"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="restaurant"
                as={Link}
                to="restaurant"
                active={activeItem === "restaurant"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="menu"
                as={Link}
                to="menu"
                active={activeItem === "menu"}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment style={{ width: "65vw" }}>
              <Switch>
                <Route path="/user/user-profile" component={Profile} />
                <Route path="/user/restaurant" component={Restaurant} />
                <Route path="/user/menu" component={RestaurantMenu} />
              </Switch>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default UserProfile;