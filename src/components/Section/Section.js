import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Header, Icon,Image, Item } from "semantic-ui-react";

import MenuItem from "../MenuItem/MenuItem";
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

  componentDidMount() {
    this.props.requestItems(this.props.id)
              .then(response => this.setState({ items: this.props.items }));
  }

  render() {
    const items = this.state.items;
    //update on submit from ItemAdder
    if(this.state.index > 0){
      console.log()
      this.props
        .requestItems(this.props.id)
        .then(response => this.setState({ items: this.props.items, index: 0 }));
    }
    return (
      <div>
          <Header as='h2'>
            <Icon name='book' />
            <Header.Content>
              {this.props.name}
              <Button inverted color='blue' floated='right'>Edit <Icon name="wrench" /> </Button>
              <Button inverted color='red' floated='right'>Delete <Icon name="delete" /> </Button>
            </Header.Content>
          </Header>
        <Item.Group divided>
        {items.length > 0 &&
          items.map(item => (
            <MenuItem
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
        </Item.Group>
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
