import React, { Component } from 'react';

import "./Item.css"

class Item extends Component {
    render() {
        return (
            <div className="menuItem">
                <h1>{this.props.name}</h1>
                <h2>{this.props.price}</h2>
                <p>{this.props.description}</p>
                <img className="itemImage" src={this.props.image} alt={this.props.name}/>
                
            </div>
        );
    }
}

export default Item;