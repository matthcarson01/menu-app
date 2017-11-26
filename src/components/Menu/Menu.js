import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { requestUser, requestRestaurant, requestSections } from "../../ducks/reducer";
import Section from "../Section/Section";
import SectionAdder from "../SectionAdder/SectionAdder";
import "./Menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index:0
    }
  }

  componentDidMount() {
    this.props
      .requestUser()
      .then(() => this.props.requestRestaurant(this.props.user.user_id))
      .then(()=>this.props.requestSections(this.props.restaurant[0].restaurant_id))
  }
  componetDidUpdate(prevProps, prevState){
    if(prevState.index !== this.state.index){
      console.log("It worked");
      this.props.requestSections(this.props.restaurant[0].restaurant_id);
    }
  }

  render() {
    const sections=this.props.sections;
    return <div>
        {sections && sections.map(section => (
            <Section
              id={section.section_id}
              name={section.section_name}
              key={section.section_id}
            />
          ))}
        <SectionAdder updateState={i=>this.setState({index:this.state.index+i})}/>
      </div>;
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurant,
    user: state.user,
    sections: state.sections
  }
}

export default connect(mapStateToProps, { requestUser, requestRestaurant, requestSections})(Menu);