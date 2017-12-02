import React, { Component } from "react";
import { connect } from "react-redux";
import { Item } from "semantic-ui-react";
import { Link } from "react-router-dom";
import HeaderBar from "../HeaderBar/HeaderBar";

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
        return <div>
            <HeaderBar />
            <main>
              <h1>Test</h1>
              {restaurants.length <= 0 && <h3>No Results</h3>}
              <Item.Group>
                {restaurants.map(restaurant => <Item>
                    <Item.Image size="small" src={restaurant.cover_image} />
                    <Item.Content>
                      <Item.Header as={Link} to={`/eat/${restaurant.restaurant_url}`}>
                        {restaurant.restaurant_name}
                      </Item.Header>
                      <Item.Description>
                          <div>{restaurant.address}</div>
                          <div>{restaurant.city}</div>
                          <div>{restaurant.state}</div>
                      </Item.Description>
                    </Item.Content>
                  </Item>)}
              </Item.Group>
            </main>
          </div>;
    }
}
function mapStateToProps(state){
  return {
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps, {requestRestaurants})(Results);