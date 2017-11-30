import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Rail,
  Segment,
  Visibility
} from "semantic-ui-react";

import HeaderBar from "../HeaderBar/HeaderBar";
import PageItem from "../PageItem/PageItem";
import { requestPage, requestSections } from "../../ducks/reducer";
import "./RestaurantPage.css";


class RestaurantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentWillMount() {
    let { restaurantURL } = this.props.match.params;
    this.props.requestPage(restaurantURL).then(() =>
        this.props.requestSections(this.props.restaurant[0].restaurant_id));
  }

  render() {
    const restaurant = this.props.restaurant[0];
    const sections = this.props.sections;

    return <div>
        {restaurant && <div>
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
                        //  <Segment.Group basic>
                        //     <Header as='h3' dividing style={{padding:"1em"}}>{section.section_name}</Header>
                        //     <Segment basic>Item One</Segment>
                        //     <Segment basic>Item Two</Segment>
                        //     <Segment basic>Item Three</Segment>
                        // </Segment.Group>
                        ))}
                    </Segment.Group>
                </Grid.Column>
                <Grid.Column  width={4}>
                    {/* <Rail> */}
                    <Segment>Right Rail Content</Segment>
                    {/* </Rail> */}
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
