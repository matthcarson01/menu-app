import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";

import { requestUser, requestRestaurant } from "../../ducks/reducer";
import './SectionAdder.css';

class SectionAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id:0,
      section_id:0,
      section_name:''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.requestUser()
            .then(() =>this.props.requestRestaurant(this.props.user.user_id))
            .then(this.setState({restaurant_id: this.props.restaurant[0].restaurant_id}));
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.section_id!==this.state.section_id){
    axios.post(`/api/restaurant_menu`, {
        section_id: this.state.section_id,
        restaurant_id: this.state.restaurant_id
      }).then(this.setState({
        section_id:0,
        section_name:''
      }));
    }
  }
  onChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    axios.post(`/api/menu_section`, {section_name: this.state.section_name})
        .then(response=>this.setState({section_id:response.data[0].section_id}));
    };
   
    //create section based on menu id
  
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        Add Menu Section
        <input
          type="text"
          name="section_name"
          value={this.state.section_name}
          onChange={this.onChange}
        />
        <button type="submit" value="Submit" className="Submit-Button">
          <i className="fa fa-plus" />
        </button>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    restaurant: state.restaurant,
    user: state.user
  };
}
export default connect(mapStateToProps, {requestUser, requestRestaurant})(SectionAdder);