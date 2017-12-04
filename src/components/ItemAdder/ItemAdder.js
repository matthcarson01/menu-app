import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Header, Item, Modal,TextArea } from "semantic-ui-react";

import firebase from "../../firebase";
import { requestUser, requestRestaurant, requestSections, addItems } from "../../ducks/reducer";

class ItemAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_name: "",
      item_description: "",
      item_image: "",
      item_price: 0,
      file: "",
      imagePreviewUrl: "http://via.placeholder.com/300x300",
      downloadURL: "http://via.placeholder.com/300x300",
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
    let that = this;
    let file = this.state.file;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child("profilePictures/" + file.name)
      .put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      function(error) {},
      function() {
        that.setState({ downloadURL: uploadTask.snapshot.downloadURL });
        that.props
          .addItems({
            section_id: that.props.section_id,
            item_name: that.state.item_name,
            item_description: that.state.item_description,
            item_image: uploadTask.snapshot.downloadURL,
            item_price: that.state.item_price
          })
          .then(() =>
            that.setState({
              item_name: "",
              item_description: "",
              item_image: "",
              item_price: 0,
              downloadURL: "http://via.placeholder.com/300x300",
              imagePreviewUrl: "http://via.placeholder.com/300x300",
              modalOpen: false
            })
          )
          .then(() => that.props.updateState(5));
      }
    );
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
          <Modal trigger={<Button onClick={this.handleOpen} style={{width:"10rem"}}>
                Add New Item
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
                    }} alt="preview image" />{/* Possibly move onchange out to separte function*/}
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

export default connect(mapStateToProps, { requestUser, requestRestaurant, requestSections, addItems })(ItemAdder);