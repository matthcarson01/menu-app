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
    return <div className="userProfile">
        <h1>User:</h1>
        {this.props.user && <div>
          <span className="title">Name:</span> {this.props.user.user_name}
          </div>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser })(Profile);
