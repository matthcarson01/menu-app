import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Item } from "semantic-ui-react";
import { Link } from "react-router-dom";
import HeaderBar from "../HeaderBar/HeaderBar";
import {urlToProperty} from "query-string-params";

import { requestRestaurants } from "../../ducks/reducer";
import "./Results.css";

class Results extends Component {
    componentWillMount(){
      let parsed = urlToProperty(this.props.location.search);
      let {city,type} = parsed;
      this.props.requestRestaurants({city,type});
    }
    render(){
        const restaurants = this.props.restaurants;
        let parsed = urlToProperty(this.props.location.search);
        let { city, type } = parsed;
        let subscriptBoth = `Results for ${type} Restaurants in ${city}`;
        let subscriptCity = `Results for All Restaurants in ${city}`;
        let subscriptType = `Results for All  ${type} Restaurants`;
        return <div>
            <HeaderBar showButton={false} />
            <main className="resultSection">
              {city && type && <Header as="h2" content="Search Results" subheader={subscriptBoth} textAlign="left" />}
              {!city && type && <Header as="h2" content="Search Results" subheader={subscriptType} textAlign="left" />}
              {city && !type && <Header as="h2" content="Search Results" subheader={subscriptCity} textAlign="left" />}
              {restaurants.length <= 0 && <h3>No Results</h3>}
              <Item.Group divided style={{ width: "100%" }}>
                {restaurants.map(restaurant => (
                  <Item
                    key={restaurant.restaurant_id}
                    style={{ width: "100%" }}
                    className="result"
                  >
                    <Item.Image
                      size="small"
                      src={restaurant.cover_image}
                    />
                    <Item.Content className="resultBox">
                      <Item.Header
                        as='h1'
                        as={Link}
                        to={`/eat/${restaurant.restaurant_url}`}
                        content={restaurant.restaurant_name}
                      />
                      {/* {restaurant.restaurant_name}
                      </Item.Header> */}
                      <Item.Meta content="Address" />
                      {/* <span>Address</span>
                      </Item.Meta> */}
                      <Item.Description className="resultBox">
                        <span>
                          {restaurant.address}
                          <br />
                        </span>
                        <span>
                          {restaurant.city}, {restaurant.state}
                        </span>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                ))}
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