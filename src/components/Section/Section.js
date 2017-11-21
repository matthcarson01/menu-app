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
                
            </div>
        );
    }
}

export default Section;