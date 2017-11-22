import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { requestUser, requestRestaurant } from "../../ducks/reducer";
import Section from "../Section/Section";
import SectionAdder from "../SectionAdder/SectionAdder";
import "./Menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props
      .requestUser()
      .then(() => this.props.requestRestaurant(this.props.user.user_id))
      .then(
        axios.get(`/api/get_sections/${this.props.restaurant[0].restaurant_id}`)
            .then(response => {this.setState({sections:response.data})})
      );
      // .then(console.log(this.props.user, this.props.restaurant[0]));
  }

  render() {
    const sections=this.state.sections;
    return <div>
        {sections && sections.map(section => <Section id={section.section_id} name={section.section_name}/>)}
    
        <SectionAdder />
      </div>;
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurant,
    user: state.user
  }
}

export default connect(mapStateToProps, { requestUser, requestRestaurant})(Menu);