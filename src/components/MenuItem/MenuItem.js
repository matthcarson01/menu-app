import React, { Component } from 'react';
import { Button,Icon, Item } from "semantic-ui-react";
import { connect } from "react-redux";

import ItemEdit from "../ItemEdit/ItemEdit";
import { deleteItem, requestItems } from "../../ducks/reducer";
import "./MenuItem.css"

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      index:0
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props
      .deleteItem(this.props.id)
      .then(() => this.props.requestItems(this.props.section_id))
      .then(() => this.props.updateState(5));
  }

  render() {
    if(this.state.index>0){
      this.props.updateState(5);
      this.setState({index:0});
    }
    return <Item>
        <Item.Image size="medium" src={this.props.image} />
        <Item.Content>
          <Item.Header as="a">{this.props.name}</Item.Header>
          <Item.Meta>
            Price:<span>${this.props.price}</span>
          </Item.Meta>
          <Item.Description>{this.props.description}</Item.Description>
          <Item.Extra>
            <ItemEdit 
              updateState={i => this.setState({ index: this.state.index + i } )}
              itemName={this.props.name} 
              itemDescription={this.props.description} 
              itemImage={this.props.image} itemId={this.props.id} 
              itemPrice={this.props.price}  />
            <Item>
              <Button color="red" floated="right" onClick={this.handleDelete}>
                Delete<Icon name="delete" />
              </Button>
            </Item>
          </Item.Extra>
        </Item.Content>
      </Item>;
  }
}

function mapStateToProps(state){
  return {
    items: state.items
  }
}

export default connect(mapStateToProps, { deleteItem, requestItems })(MenuItem);