import React, { Component } from 'react';


import { Button, Grid, Input } from "semantic-ui-react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import TextLoop from "react-text-loop";
import { Link } from "react-router-dom";


import { requestRestaurants } from "../../ducks/reducer";
import HeaderBar from "../HeaderBar/HeaderBar";
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city:"",
      type:"",
      fireRedirect: false,
      cityRedirect:false,
      typeRedirect:false
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }


  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    if(this.state.city && this.state.type){
      this.setState({ 
        fireRedirect: true,
        cityRedirect:true,
        typeRedirect:true 
      });
      }else if(this.state.city && !this.state.type){
      this.setState({
        fireRedirect: true,
        cityRedirect: true,
        typeRedirect: false
      });
    }else if(!this.state.city && this.state.type){
      this.setState({
        fireRedirect: true,
        cityRedirect: false,
        typeRedirect: true
      });
    }
  }

  render() {
    const { fireRedirect, cityRedirect, typeRedirect} = this.state;
    return <div>
        <HeaderBar showButton={true} />
        <main className="mainContent">
          <div>
          <h1 className="headLine">Menu Sage</h1>
          <h2 className="subHeader">
            What's for <TextLoop>
              <span> Breakfast</span>
              <span> Lunch</span>
              <span> Dinner</span>
            </TextLoop>
          </h2>
          </div>
          <Input className="searchInput">
            <input list="food type" name="type" placeholder="Try this.." className="typeInput" onChange={this.handleChange} />
            <input list="city" name="city" placeholder="City.." className="cityInput" onChange={this.handleChange} />
            <Button onClick={this.handleSubmit} type="submit" className="searchButton">
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
          </datalist>
        </main>
        {fireRedirect && cityRedirect && typeRedirect && <Redirect to={`/results?city=${this.state.city}&type=${this.state.type}`} style={{ display: "none" }} />}
        {fireRedirect && cityRedirect && !typeRedirect && <Redirect to={`/results?city=${this.state.city}`} style={{ display: "none" }} />}
        {fireRedirect && !cityRedirect && typeRedirect && <Redirect to={`/results?type=${this.state.type}`} style={{ display: "none" }} />}
      </div>;
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurants
  }
}

export default connect(mapStateToProps, {requestRestaurants})(Home);