import React, { Component } from "react";
import { connect } from "react-redux";
import {
//   Button,
  Card,
  Container,
//   Divider,
  Grid,
  Header,
//   Icon,
//   Image,
//   List,
//   Menu,
//   Rail,
  Segment,
  Sticky,
//   Visibility
} from "semantic-ui-react";

// import HeaderBar from "../HeaderBar/HeaderBar";
import PageItem from "../PageItem/PageItem";
import { requestPage, requestSections } from "../../ducks/reducer";
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
        {restaurant && <div ref={this.handleContextRef}>
            <Segment inverted textAlign="center" style={{ backgroundImage: "url(" + restaurant.cover_image + ")", backgroundSize: "cover", minHeight: "50vh", padding: "1em 0em" }} padded="very" vertical>
              <Container text>
                <Header as="h1" content={restaurant.restaurant_name} style={{ margin: "25% 0" }} inverted />
              </Container>
            </Segment>
            <Grid centered>
                <Grid.Column width={10}>
                    <Segment.Group raised>
                        <Segment><Header as='h2' content='Menu'/></Segment>
                        {sections.map(section=>(
                            <PageItem section={section}/>
                        ))}
                    </Segment.Group>
                </Grid.Column>
                <Grid.Column  width={4}>
                    <Sticky context={contextRef}>
                        <Card>
                            <Card.Content header={restaurant.restaurant_name} />
                            <Card.Content>
                                <Card.Meta>Address</Card.Meta>
                                <Card.Description>{restaurant.address}</Card.Description>
                                <Card.Description>{restaurant.city},{restaurant.state}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Sticky>
                </Grid.Column>
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
