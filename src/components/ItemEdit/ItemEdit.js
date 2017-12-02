import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Header, Icon, Item, Modal,TextArea } from "semantic-ui-react";

import firebase from "../../firebase";
import { requestUser, requestRestaurant, requestSections, editItem } from "../../ducks/reducer";

class ItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_name: this.props.itemName,
      item_description: this.props.itemDescription,
      item_image: this.props.itemImage,
      item_price: this.props.itemPrice,
      file: "",
      imagePreviewUrl: this.props.itemImage,
      downloadURL: this.props.itemImage,
      modalOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.processImageUpload = this.processImageUpload.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  onSubmit(e) {
    e.preventDefault();
    this.setState({modalOpen:false})
  }

  processImageUpload(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    let imagePreview = null;

    if (this.state.imagePreviewUrl) {
      imagePreview = (
        <img
          src={this.state.imagePreviewUrl}
          className="image-preview"
          alt="preview"
        />
      );
    }

    return <Item>
        <Modal trigger={<Button onClick={this.handleOpen} primary floated="right">
              Edit<Icon name="wrench" />
            </Button>} open={this.state.modalOpen} onClose={this.handleClose} basic size="small">
          <Header icon="lab" content="New Section Item" />
          <Form onSubmit={this.onSubmit}>
            <Modal.Content>
              <Form.Field control={Input} label="Item Name" placeholder="Item Name" name="item_name" value={this.state.item_name} onChange={this.handleChange} />
              <Form.Field control={TextArea} label="Item Description" placeholder="Tell us more your item..." name="item_description" value={this.state.item_description} onChange={this.handleChange} />
              <Form.Field>
                <label>Item Image:</label>
                {imagePreview}
                <input type="file" name="item_image" onChange={event => {
                    this.processImageUpload(event);
                  }} alt="preview image" />
                {/* Possibly move onchange out to separte function*/}
              </Form.Field>
              <Form.Field>
                <label>Item Price:</label>
                <input type="number" min="1" step="any" name="item_price" value={this.state.item_price} onChange={this.handleChange} />
              </Form.Field>
            </Modal.Content>
            <Modal.Actions>
              <Form.Field control={Button} type="submit" value="Submit">
                Submit
              </Form.Field>
            </Modal.Actions>
          </Form>
        </Modal>
      </Item>;
  }
}

function mapStateToProps(state){
  return {
    restaurant: state.restaurant,
    user: state.user,
    sections: state.sections,
    item: state.item
  }
}

export default connect(mapStateToProps, { requestUser, requestRestaurant, requestSections, editItem })(ItemEdit);