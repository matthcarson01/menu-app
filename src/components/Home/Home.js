import React, { Component } from 'react';

import { Button, Grid, Input } from "semantic-ui-react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { requestRestaurants } from "../../ducks/reducer";
import HeaderBar from "../HeaderBar/HeaderBar";
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city:"",
      type:"",
      fireRedirect: false
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  
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
        <HeaderBar />
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
              <option value="Cajun" />
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