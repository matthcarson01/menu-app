import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Grid, Header,Label ,Menu, Icon, Input, Segment, Select } from "semantic-ui-react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { requestRestaurants } from "../../ducks/reducer";
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city:"",
      type:"",
      fireRedirect: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
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
  // componentDidMount(){
  // Get City's and states from  database to populate options in data list
  // }
  //onSubmit that sends request to server for restauarnts that match type and city and puts results on redux store
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e){
    console.log('I submitted',this.state);
    this.props
      .requestRestaurants({city:this.state.city,type:this.state.type})
      .then(this.setState({ fireRedirect: true }));
  }

  render() {
    const { fireRedirect } = this.state;
    return <div>
        <Segment textAlign="Center" padded vertical>
          <Container>
            <Menu inverted secondary size="large">
              <Menu.Header>
                <Icon name="food" size="huge" />
              </Menu.Header>
              <Menu.Item position="right">
                {!this.state.user && <Button as="a" onClick={this.handleLogin} content="Log In" as="a" primary />}
                {this.state.user && <Button as="a" onClick={this.handleLogout} content="Log Out" as="a" color="red" />}
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
        <Grid textAlign="center" style={{ height: "89vh" }} verticalAlign="middle" className="mainContent">
          <Grid.Column style={{ maxWidth: 800 }}>
            <Input labelPosition="right">
              <input list="food type" name="type" placeholder="Try this.." style={{ width: 300 }} onChange={this.handleChange} />
              <input list="city" name="city" placeholder="City.." style={{ width: 200 }} onChange={this.handleChange} />
              <Button onClick={this.handleSubmit} type="submit">
                Search
              </Button>
            </Input>
            <datalist id="food type">
              <option value="Asian" />
              <option value="Bar-B-Q" />
              <option value="Coffee Shop" />
              <option value="Mexican" />
            </datalist>
            <datalist id="city">
              <option value="Dallas" />
              <option value="Fort Worth" />
              <option value="Austin" />
              <option value="San Antonio" />
              <option value="Houston" />
            </datalist>
          </Grid.Column>
        </Grid>
        {fireRedirect && <Redirect to={`/results/${this.state.city}/${this.state.type}`} />}
      </div>;
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurants
  }
}

export default connect(mapStateToProps, {requestRestaurants})(Home);