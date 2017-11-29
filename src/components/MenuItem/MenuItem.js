import React, { Component } from 'react';
import { Button,Icon, Item } from "semantic-ui-react";

import "./MenuItem.css"

class MenuItem extends Component {
    render() {
        return (
            <Item>
                <Item.Image size='medium' src={this.props.image} />
                <Item.Content>
                    <Item.Header as='a'>{this.props.name}</Item.Header>
                    <Item.Meta>Price:<span>${this.props.price}</span></Item.Meta>
                    <Item.Description>
                        {this.props.description}
                    </Item.Description>
                    <Item.Extra>
                        <Button primary floated='right'>Edit<Icon name="wrench" /> </Button>
                        <Button color="red" floated="right">Delete<Icon name="delete"/></Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    }
}

export default MenuItem;