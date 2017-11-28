import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";

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
      imagePreviewUrl: "",
      downloadURL: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.processImageUpload = this.processImageUpload.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let that = this;
    let file = this.state.file;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child("profilePictures/" + file.name).put(file);
    uploadTask.on("state_changed", snapshot => {}, function(error) {}, function() {
        console.log(uploadTask.snapshot.downloadURL);
        that.setState({ downloadURL: uploadTask.snapshot.downloadURL });
        console.log(that.state.downloadURL);
        that.props
          .addItems({
            section_id: that.props.section_id,
            item_name: that.state.item_name,
            item_description: that.state.item_description,
            item_image: uploadTask.snapshot.downloadURL,
            item_price: that.state.item_price
          })
          .then(that.setState({
              item_name: "",
              item_description: "",
              item_image: "",
              item_price: 0
            }))
          .then(that.props.updateState(5));

      });
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
    let downloadURL = null;

    if (this.state.imagePreviewUrl) {
      imagePreview = <img src={this.state.imagePreviewUrl} className="image-preview" />;
    }

    if (this.state.downloadURL) {
      downloadURL = <h1> {this.state.downloadURL} </h1>;
    }

    return <form onSubmit={this.onSubmit}>
        <lable>
          Item Name:
          <input type="text" name="item_name" value={this.state.value} onChange={this.handleChange} />
        </lable>
        <lable>
          Item Description:
          <textarea name="item_description" value={this.state.value} onChange={this.handleChange} />
        </lable>
        <lable>
          Item Image:
          {imagePreview}
          <input type="file" name="item_image" onChange={event => {this.processImageUpload(event)}} alt="preview image" />
        </lable>
        <lable>
          Item Price:
          <input type="number" min="1" step="any" name="item_price" value={this.state.value} onChange={this.handleChange} />
        </lable>
        <button type="submit" value="Submit">
          Add
        </button>
      </form>;
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