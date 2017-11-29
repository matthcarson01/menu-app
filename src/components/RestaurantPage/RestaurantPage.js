import React, { Component } from "react";
import { connect } from "react-redux";
import { Item } from "semantic-ui-react";
import HeaderBar from "../HeaderBar/HeaderBar";

import { requestPage, requestSections } from "../../ducks/reducer";
import "./RestaurantPage.css";

class RestaurantPage extends Component {
  // constructor(props){
  //     super(props);
  // }
  componentWillMount() {
    let { restaurantURL } = this.props.match.params;
    this.props
        .requestPage(restaurantURL)
        .then(() => this.props.requestSections(this.props.restaurant[0].restaurant_id));
  }
  render() {
    const restaurant = this.props.restaurant[0];
    const sections = this.props.sections;
    return (
      <div>
        <HeaderBar />
        <main>
            {restaurant &&
         <div>
            <h2>{restaurant.restaurant_name}</h2>
            <img src={this.props.restaurant[0].cover_image} alt="cover"/>
        </div>}
        </main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    restaurant: state.restaurant,
    sections: state.sections
  };
}

export default connect(mapStateToProps, { requestPage, requestSections })(RestaurantPage);
