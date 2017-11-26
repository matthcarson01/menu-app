import React, { Component } from 'react';
import axios from "axios";

import { requestUser, requestRestaurant, requestSections } from "../../ducks/reducer";

class ItemAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_name: "",
      item_description: "",
      item_image: "",
      item_price: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/item", {
        section_id: this.props.section_id,
        item_name: this.state.item_name,
        item_description: this.state.item_description,
        item_image: this.state.item_image,
        item_price: this.state.item_price
      })
      .then(this.setState({
          item_name: "",
          item_description: "",
          item_image: "",
          item_price: 0
        }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <lable>
          Item Name:
          <input
            type="text"
            name="item_name"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </lable>
        <lable>
          Item Description:
          <textarea
            name="item_description"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </lable>
        <lable>
          Item Image:
          <input
            type="url"
            name="item_image"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </lable>
        <lable>
          Item Price:
          <input
            type="number"
            min="1"
            step="any"
            name="item_price"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </lable>
        <button type="submit" value="Submit">
          Add
        </button>
      </form>
    );
  }
}

export default ItemAdder;