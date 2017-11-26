import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";

import ItemAdder from "../ItemAdder/ItemAdder";
import { requestUser, requestRestaurant } from "../../ducks/reducer";
import "./Section.css";

class Section extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
//componentdidmount that gets all menu items

//onclick that deletes the section from database 

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <h3>Section ID:{this.props.id}</h3>
                <button>Delete</button>
                <ItemAdder section_id={this.props.id}/>
            </div>
        );
    }
}

export default Section;