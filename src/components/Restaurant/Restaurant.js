import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";

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
    var restaurant = this.props.restaurant[0];
    console.log(restaurant);
    return <div>
        {restaurant && <h1>{restaurant.restaurant_name}</h1>}
        {!restaurant && <h1>Add Your Restaurant</h1>}
        <form>
          <label>
            Name:
            {restaurant && <span>{restaurant.restaurant_name}</span>}
            {!restaurant && <input type="text" name="restaurant_name" />}
          </label>
          <label>
            Address:
            {restaurant && <span>{restaurant.address}</span>}
            {!restaurant && <input type="text" name="address" />}
          </label>
          <label>
            City:
            {restaurant && <span>{restaurant.city}</span>}
            {!restaurant && <input type="text" name="city" />}
          </label>
          <label>
            State:
            {restaurant && <span>{restaurant.state}</span>}
            {!restaurant && <input type="text" name="state" />}
          </label>
          <label>
            Zip:
            {restaurant && <span>{restaurant.zip}</span>}
            {!restaurant && <input type="number" name="zip" />}
          </label>
          <label>
            Phone:
            {restaurant && <span>{restaurant.phone}</span>}
            {!restaurant && <input type="text" name="phone" />}
          </label>
          <label>
            Email:
            {restaurant && <span>{restaurant.email}</span>}
            {!restaurant && <input type="text" name="email" />}
          </label>
          <label>
            Restaurant Type:
            {restaurant && restaurant.restaurant_type && <span>{restaurant.restaurant_type}</span>}
            {restaurant && !restaurant.restaurant_type && <input type="text" name="restaurant_type" />}
            {!restaurant  && <input type="text" name="restaurant_type" />}
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>;
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurant,
    user: state.user
  }
}

export default connect(mapStateToProps, { requestUser, requestRestaurant})(Restaurant);
