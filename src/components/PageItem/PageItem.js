import React, { Component } from 'react';
import { connect } from "react-redux";
import {Header,Segment,Item} from "semantic-ui-react";

import { requestItems } from "../../ducks/reducer";
import "./PageItem.css";

class PageItem extends Component {
    constructor(props){
        super(props);
        this.state={
            items:[]
        };
    }
    componentWillMount() {
        let { section_id } = this.props.section;
        this.props.requestItems(section_id).then(response=>this.setState({items:response.value}))
    }

    render() {
        const section = this.props.section;
        const items = this.state.items;
        return <div style={{ width: "90%", margin: "1em auto" }}>
            {items.length > 0 && <Segment basic>
                <Header as="h3" dividing style={{ padding: "1em" }}>
                  {section.section_name}
                </Header>
                <Item.Group>
                  {items.map(item => <Item className="menuItem">
                      <Item.Image size="tiny" src={item.item_image} alt={item.item_name} />
                      <Item.Content>
                        <Item.Header as="a">
                          {item.item_name}
                        </Item.Header>
                        <Item.Meta>Descrtiption</Item.Meta>
                        <Item.Description>
                          {item.item_description}
                        </Item.Description>
                        <Item.Extra>
                          Price: ${item.item_price}
                        </Item.Extra>
                      </Item.Content>
                    </Item>)}
                </Item.Group>
              </Segment>}
          </div>;
    }
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps, { requestItems })(PageItem);
