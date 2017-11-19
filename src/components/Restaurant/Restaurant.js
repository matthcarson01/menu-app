import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";

import RestaurantForm from "../RestaurantForm/RestaurantForm"
import { requestUser, requestRestaurant } from "../../ducks/reducer";
import "./Restaurant.css";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.requestUser().then(() => this.props.requestRestaurant(this.props.user.user_id))
  }

  onSubmit(e){
    e.preventDefault
  }


  render() {
    var restaurant = this.props.restaurant[0];
    return (<div>
        {!restaurant && (
          <RestaurantForm/>
        )}
        {restaurant && (
        <h1>{restaurant.restaurant_name}</h1>

        )}
      </div>)
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurant,
    user: state.user
  }
}

export default connect(mapStateToProps, { requestUser, requestRestaurant})(Restaurant);
