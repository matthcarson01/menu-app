import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Header, Item, Segment } from "semantic-ui-react";

import MenuItem from "../MenuItem/MenuItem";
import ItemAdder from "../ItemAdder/ItemAdder";
import SectionEdit from "../SectionEdit/SectionEdit";
import { requestUser, requestRestaurant, requestSections, requestItems, deleteSection, deleteItems} from "../../ducks/reducer";
import "./Section.css";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      index: 0
    };
    this.handleDelete=this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.requestItems(this.props.id)
              .then(response => this.setState({ items: this.props.items }));
  }

  handleDelete(){
    this.props
      .deleteItems(this.props.id)
      .then(() => {
        this.props.deleteSection(this.props.id);
      })
      .then(() => this.props.requestRestaurant(this.props.user.user_id))
      .then(() =>
        this.props.requestSections(this.props.restaurant[0].restaurant_id)
      );
  }

  render() {
    const items = this.state.items;
    //update on submit from ItemAdder
    if(this.state.index > 0){
      this.props
        .requestItems(this.props.id)
        .then(response => this.setState({ items: this.props.items, index: 0 }));
    }
    return <div>
        <Segment basic>
          <Header size="large" floated="left">
            {this.props.name}
          </Header>
          <Header floated="right">
            <SectionEdit name={this.props.name} id={this.props.id} />
            <div style={{ display: "inline-block" }}>
              <Button icon="trash outline" color="red" onClick={this.handleDelete} size="massive" />
            </div>
          </Header>
        </Segment>
        <Item.Group divided>
          {items.length > 0 && items.map(item => (
              <MenuItem
                section_id={this.props.id}
                id={item.item_id}
                name={item.item_name}
                description={item.item_description}
                image={item.item_image}
                price={item.item_price}
                key={item.item_id}
                updateState={i =>
                  this.setState({ index: this.state.index + i })
                }
              />
            ))}
          <ItemAdder section_id={this.props.id} updateState={i => this.setState(
                { index: this.state.index + i }
              )} />
        </Item.Group>
      </div>;
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

export default connect(mapStateToProps, { requestUser, requestRestaurant, requestSections, requestItems, deleteSection, deleteItems })(Section);
