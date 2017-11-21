import React, { Component } from "react";
import { connect } from "react-redux";

import { requestUser, requestRestaurant } from "../../ducks/reducer";
import SectionAdder from "../SectionAdder/SectionAdder";
import "./Menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.requestUser().then(() => this.props.requestRestaurant(this.props.user.user_id))
    //check for menu id
    //if menu id exist retrieve from redux store
    //if not create menu id assign restaurant id
  }

  render() {
    const restaurant = this.props.restaurant[0];
    return(
      <div>
        <SectionAdder />
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurant,
    user: state.user
  }
}

export default connect(mapStateToProps, { requestUser, requestRestaurant})(Menu);