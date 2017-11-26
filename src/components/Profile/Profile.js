import React, { Component } from "react";
import { connect } from "react-redux";

import { requestUser } from "../../ducks/reducer";
import "./Profile.css";

class Profile extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.requestUser();  
  }
  render() {
    return <div>
        <h1>Profile Component</h1>
        {this.props.user && <div>Name: {this.props.user.user_name}</div>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser })(Profile);
