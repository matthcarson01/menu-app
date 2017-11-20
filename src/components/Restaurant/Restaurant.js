import React, { Component } from "react";
import { connect } from "react-redux";

import RestaurantForm from "../RestaurantForm/RestaurantForm"
import RestaurantProfile from "../RestaurantProfile/RestaurantProfile"
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


  render() {
    const restaurant = this.props.restaurant[0];
    return (<div>
        {!restaurant && (
          <RestaurantForm/>
        )}
        {restaurant && (
        <RestaurantProfile/>
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
