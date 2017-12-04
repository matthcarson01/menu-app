import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { Button, Icon, Input } from "semantic-ui-react";

import { requestUser, requestRestaurant } from "../../ducks/reducer";
import './SectionAdder.css';

class SectionAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id:this.props.restaurantId,
      section_id:0,
      section_name:''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]:e.target.value});
    console.log("section_name",this.state.section_name);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("entered On submit")
    axios
      .post(`/api/menu_section`, {
        section_name: this.state.section_name,
        restaurant_id: this.state.restaurant_id
      })
      .then(response => {
        this.setState({ section_id: 0, section_name: "" });
      })
      .then(this.props.updateState(5));
    };
   
    //create section based on menu id
  
  render() {
    return <form onSubmit={this.onSubmit} className="addInput">
        <Input name="section_name" value={this.state.section_name} onChange={this.onChange} style={{ borderRadius: " .28571429rem 0 0.28571429rem " }} /> 
        <Button content="Add" type="submit" value="Submit" style={{ borderRadius: "0 .28571429rem .28571429rem 0" }} />
      </form>;
  }
}
function mapStateToProps(state) {
  return {
    restaurant: state.restaurant,
    user: state.user
  };
}
export default connect(mapStateToProps, {requestUser, requestRestaurant})(SectionAdder);