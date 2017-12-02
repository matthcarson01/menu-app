import React, { Component } from 'react';
import { Button,Icon, Item } from "semantic-ui-react";
import { connect } from "react-redux";

import { deleteItem, requestItems } from "../../ducks/reducer";
import "./MenuItem.css"

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props
      .deleteItem(this.props.id)
      .then(() => this.props.requestItems(this.props.section_id))
      .then(() => this.props.updateState(5));
  }

  render() {
    return (
      <Item>
        <Item.Image size="medium" src={this.props.image} />
        <Item.Content>
          <Item.Header as="a">{this.props.name}</Item.Header>
          <Item.Meta>
            Price:<span>${this.props.price}</span>
          </Item.Meta>
          <Item.Description>{this.props.description}</Item.Description>
          <Item.Extra>
            <Button primary floated="right">
              Edit<Icon name="wrench" />{" "}
            </Button>
            <Button color="red" floated="right" onClick={this.handleDelete}>
              Delete<Icon name="delete" />
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

function mapStateToProps(state){
  return {
    items: state.items
  }
}

export default connect(mapStateToProps, { deleteItem, requestItems })(MenuItem);