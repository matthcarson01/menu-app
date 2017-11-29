import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { Grid, Icon, Menu, Segment } from "semantic-ui-react";

import HeaderBar from '../HeaderBar/HeaderBar';
import Profile from '../Profile/Profile';
import Restaurant from '../Restaurant/Restaurant';
import RestaurantMenu from "../RestaurantMenu/RestaurantMenu";
import './UserProfile.css';

class UserProfile extends Component{
  constructor(props){
    super(props);
    this.state = { activeItem: "user" };
    this.handleItemClick=this.handleItemClick.bind(this);
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render(){
      const { activeItem } = this.state;
        return (<div>
            <HeaderBar />
            <Menu attached="top">
              <Menu.Header><Icon name="wrench" size="big"/>User Settings</Menu.Header>
            </Menu>
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Link to="user-profile">
                    <Menu.Item name="user" active={activeItem === "user"} onClick={this.handleItemClick} />
                  </Link>
                  <Link to="restaurant">
                    <Menu.Item name="restaurant" active={activeItem === "restaurant"} onClick={this.handleItemClick} />
                  </Link>
                  <Link to="menu">
                    <Menu.Item name="menu" active={activeItem === "menu"} onClick={this.handleItemClick} />
                  </Link>
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
          </div>)
    }
}
export default UserProfile;