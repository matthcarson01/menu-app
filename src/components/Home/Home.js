import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Grid, Header, Menu, Icon, Input, Segment } from "semantic-ui-react";

import {connect} from 'react-redux';
import './Home.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(){
        window.location.href="http://localhost:3001/login"
    }
    componentWillMount(){
                axios.get("/api/me").then(response => {
                  if (!response.data) this.setState({
                      user: null
                    });
                  else this.setState({ user: response.data });
                });
    }
    // componentDidMount(){

    // }
    render(){
        return <div>
            <Segment textAlign="Center" padded vertical>
              <Container>
                <Menu inverted secondary size="large">
                  <Menu.Header>
                    <Icon name="food" size="huge" />
                  </Menu.Header>
                  <Menu.Item position="right">
                    <Button as="a" onClick={this.handleLogin} content="Log In" as="a" primary />
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            <Grid textAlign="center" style={{ height: "70vh" }} verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 450 }}>
                <Input fluid icon="search" iconPosition="left" placeholder="City, State, or Zipcode" />
              </Grid.Column>
            </Grid>
          </div>;
    }
}
function mapStateToProps(state) {
  return {
    state
  };
}
export default connect( mapStateToProps )( Home );