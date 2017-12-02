import React, { Component } from "react";
import { connect } from "react-redux";

import { requestUser, requestRestaurant, requestSections } from "../../ducks/reducer";
import Section from "../Section/Section";
import SectionAdder from "../SectionAdder/SectionAdder";
import "./RestaurantMenu.css";

class RestaurantMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    this.props
      .requestUser()
      .then(() => this.props.requestRestaurant(this.props.user.user_id))
      .then(() =>
        this.props.requestSections(this.props.restaurant[0].restaurant_id)
      );
  }

  render() {
    //Resetting state when I hit section adder
    if (this.state.index > 0) {
      this.props
        .requestSections(this.props.restaurant[0].restaurant_id)
        .then(response => this.setState({ index: 0 }))
        .then(console.log("new Sections:", this.props.sections));
    }
    //
    const sections = this.props.sections;
    let restaurant = {};
    this.props.restaurant[0]
      ? (restaurant = this.props.restaurant[0])
      : (restaurant = {});

    return (
      <div>
        <SectionAdder
          userId={this.props.user.user_id}
          restaurantId={restaurant.restaurant_id}
          updateState={i => this.setState({ index: this.state.index + i })}
        />
        {sections &&
          sections.map(section => (
            <Section
              id={section.section_id}
              name={section.section_name}
              key={section.section_id}
            />
          ))}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurant,
    user: state.user,
    sections: state.sections
  }
}

export default connect(mapStateToProps, { requestUser, requestRestaurant, requestSections})(RestaurantMenu);