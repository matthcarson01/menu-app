import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Grid,
  Header,
  Image,
  Responsive,
  Segment,
  Sticky,
} from "semantic-ui-react";

import HeaderBar from "../HeaderBar/HeaderBar";
import PageItem from "../PageItem/PageItem";
import { requestPage, requestSections } from "../../ducks/reducer";
import logo from "./logo.svg";
import "./RestaurantPage.css";


class RestaurantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleContextRef=this.handleContextRef.bind(this);
  }

  componentWillMount() {
    let { restaurantURL } = this.props.match.params;
    this.props.requestPage(restaurantURL)
            .then(() =>this.props.requestSections(this.props.restaurant[0].restaurant_id));
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const restaurant = this.props.restaurant[0];
    const sections = this.props.sections;
    const { contextRef } = this.state;

    return <div>
        {/* <HeaderBar /> */}
        {restaurant && <div ref={this.handleContextRef}>
            <Segment textAlign="center" style={{ background: "url(" + restaurant.cover_image + ")", backgroundSize: "cover", height: "50vh", padding: 0 }} vertical>
              <div className="menuHero">
                <Image src={logo} as={Link} to="/" className="appLogo" />
                <h1>{restaurant.restaurant_name}</h1>
              </div>
            </Segment>
            <Grid centered style={{ background: "lightgray", minHeight: "50vh" }}>
              <Responsive as={Grid.Row} maxWidth={725}>
                <Responsive as={Grid.Column} width={14} maxWidth={725}>
                  <Card>
                    <Card.Content header={restaurant.restaurant_name} />
                    <Card.Content>
                      <Card.Meta>Address</Card.Meta>
                      <Card.Description>
                        {restaurant.address}
                      </Card.Description>
                      <Card.Description>
                        {restaurant.city},{restaurant.state}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content>
                      <Card.Meta>Phone</Card.Meta>
                      <Card.Description>
                        {restaurant.phone}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Responsive>
              </Responsive>
              <Responsive as={Grid.Row} maxWidth={725}>
                <Responsive as={Grid.Column} width={14} maxWidth={725}>
                  <Segment.Group style={{ background: "white" }} raised>
                    <Segment>
                      <Header as="h2" content="Menu" />
                    </Segment>
                    {sections.map(section => (
                      <PageItem section={section} />
                    ))}
                  </Segment.Group>
                </Responsive>
              </Responsive>
              <Responsive as={Grid.Column} width={10} minWidth={726}>
                <Segment.Group style={{ background: "white" }} raised>
                  <Segment>
                    <Header as="h2" content="Menu" />
                  </Segment>
                  {sections.map(section => <PageItem section={section} />)}
                </Segment.Group>
              </Responsive>
              <Responsive as={Grid.Column} width={4} minWidth={726}>
                <Sticky context={contextRef}>
                  <Card>
                    <Card.Content header={restaurant.restaurant_name} />
                    <Card.Content>
                      <Card.Meta>Address</Card.Meta>
                      <Card.Description>
                        {restaurant.address}
                      </Card.Description>
                      <Card.Description>
                        {restaurant.city},{restaurant.state}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content>
                      <Card.Meta>Phone</Card.Meta>
                      <Card.Description>
                        {restaurant.phone}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Sticky>
              </Responsive>
            </Grid>
          </div>}
      </div>;
  }
}
function mapStateToProps(state) {
  return {
    restaurant: state.restaurant,
    sections: state.sections
  };
}

export default connect(mapStateToProps, { requestPage, requestSections })(RestaurantPage);
