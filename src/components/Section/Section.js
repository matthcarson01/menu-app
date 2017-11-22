import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";

import { requestUser, requestRestaurant } from "../../ducks/reducer";
import "./Section.css";

class Section extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <h3>Section ID:{this.props.id}</h3>
                <button>Delete</button>
            </div>
        );
    }
}

export default Section;