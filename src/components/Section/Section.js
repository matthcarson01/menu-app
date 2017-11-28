import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";

import Item from "../Item/Item";
import ItemAdder from "../ItemAdder/ItemAdder";
import { requestUser, requestRestaurant, requestSections, requestItems } from "../../ducks/reducer";
import "./Section.css";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      index: 0
    };
  }
  //componentdidmount that gets all menu items
  componentDidMount() {
    this.props
      .requestItems(this.props.id)
      .then(response => this.setState({ items: this.props.items }));
  }

  //onclick that deletes the section from database

  render() {
    const items = this.state.items;
    //update on submit from ItemAdder
    if(this.state.index > 0){
      console.log("Hey That worked")
      this.props
        .requestItems(this.props.id)
        .then(response => this.setState({ items: this.props.items, index: 0 }));
    }
    return (
      <div className="menuFlex">
        <h1>{this.props.name}</h1>
        <h3>Section ID:{this.props.id}</h3>
        <button>Delete</button>
        {items.length > 0 &&
          items.map(item => (
            <Item
              id={item.item_id}
              name={item.item_name}
              description={item.item_description}
              image={item.item_image}
              price={item.item_price}
              key={item.item_id}
            />
          ))}
        <ItemAdder
          section_id={this.props.id}
          updateState={i => this.setState({ index: this.state.index + i })}
        />
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    restaurant: state.restaurant,
    user: state.user,
    sections: state.sections,
    items: state.items
  }
}

export default connect(mapStateToProps, { requestUser, requestRestaurant, requestSections, requestItems })(Section);
