import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import axios from "axios";

import firebase from "../../firebase";
import { requestUser } from "../../ducks/reducer";

class RestaurantFrom extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant_name:'',
            address:'',
            city:'',
            state:'',
            zip:0,
            phone:'',
            email:'',
            cover_image:null,
            restaurant_type:'',
            file: "",
            imagePreviewUrl: null,
            downloadURL: null,
            fireRedirect: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
    this.props.requestUser();
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    processImageUpload(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
    }
    onSubmit(e){
        e.preventDefault();
        let url = (this.state.restaurant_name + "-" + this.state.city)
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/'/g, "");
        let that = this;
        let file = this.state.file;
          if (!that.state.imagePreviewUrl) {
            axios.post( `/api/user_restaurant/${that.props.user.user_id}`,
              { restaurant_name: that.state.restaurant_name,
                address: that.state.address,
                city: that.state.city,
                state: that.state.state,
                zip: that.state.zip,
                phone: that.state.phone,
                email: that.state.email,
                cover_image: `http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png`,
                restaurant_type: that.state.restaurant_type,
                restaurant_url: url}
            ).then(() => {that.setState({ fireRedirect: true })});
          } else {
            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef
              .child("profilePictures/" + file.name)
              .put(file);
            uploadTask.on("state_changed", snapshot => {}, function(error) {}, function() {
            that.setState({downloadURL: uploadTask.snapshot.downloadURL});
            axios.post(`/api/user_restaurant/${that.props.user.user_id}`, {
                restaurant_name: that.state.restaurant_name,
                address: that.state.address,
                city: that.state.city,
                state: that.state.state,
                zip: that.state.zip,
                phone: that.state.phone,
                email: that.state.email,
                cover_image: uploadTask.snapshot.downloadURL,
                restaurant_type: that.state.restaurant_type,
                restaurant_url:url
              }).then(() => {that.setState({ fireRedirect: true })});
            });
          }
    }
    render() {
        const { fireRedirect } = this.state;
        let imagePreview = null;
        if (this.state.imagePreviewUrl) {
          imagePreview = (
            <img style={{width:"300px", height:"auto"}}
              src={this.state.imagePreviewUrl}
              className="image-preview"
              alt="preview"
            />
          );
        }

        return <div>
            <form onSubmit={this.onSubmit}>
              <h1>Add Your Restaurant</h1>
              <div className="form-group">
                <label>
                  Name:
                  <input type="text" name="restaurant_name" value={this.state.restaurant_name} onChange={this.onChange} />
                </label>
                <label>
                  Address:
                  <input type="text" name="address" value={this.state.address} onChange={this.onChange} />
                </label>
                <label>
                  City:
                  <input type="text" name="city" value={this.state.city} onChange={this.onChange} />
                </label>
                <label>
                  State:
                  <input type="text" name="state" value={this.state.state} onChange={this.onChange} />
                </label>
                <label>
                  Zip:
                  <input type="number" name="zip" value={this.state.zip} onChange={this.onChange} />
                </label>
                <label>
                  Phone:
                  <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} />
                </label>
                <label>
                  Email:
                  <input type="text" name="email" value={this.state.email} onChange={this.onChange} />
                </label>
                <label>Item Image:</label>
                {imagePreview}
                <input type="file" name="item_image" onChange={event => {
                    this.processImageUpload(event);
                  }} alt="preview image" />
                <label>
                  Restaurant Type:
                  <input type="text" name="restaurant_type" value={this.state.restaurant_type} onChange={this.onChange} />
                </label>
                <input type="submit" value="Submit" className="Submit-Button" />
              </div>
            </form>
            {fireRedirect && <Redirect to={"/user/menu"} />}
          </div>;
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser })(RestaurantFrom);