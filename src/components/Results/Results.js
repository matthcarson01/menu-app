import React, { Component } from "react";
import { connect } from "react-redux";
import { Item } from "semantic-ui-react";

import { requestRestaurants } from "../../ducks/reducer";
import "./Results.css";

class Results extends Component {
    // constructor(props){
    //     super(props);
    // }
    componentWillMount(){
        let {city,type} = this.props.match.params;
        this.props.requestRestaurants({city,type});
    }
    render(){
        const restaurants = this.props.restaurants;
        return(
            <div>
                <main>
                    <h1>Test</h1>
                    <Item.Group>
                        {restaurants.map(restaurant=>
                                <Item>
                                <Item.Image size='small' src={restaurant.cover_image} />
                                <Item.Content>
                                    <Item.Header as='a'>{restaurant.restaurant_name}</Item.Header>
                                    <Item.Description>
                                    <p>{restaurant.address}</p>
                                    <p>{restaurant.city}</p>
                                    <p>{restaurant.state}</p>
                                    </Item.Description>
                                </Item.Content>
                                </Item>
                        )}
                    </Item.Group>
                    
                </main>
            </div>
        )
    }
}
function mapStateToProps(state){
  return {
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps, {requestRestaurants})(Results);