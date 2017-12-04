import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

import firebase from "../../firebase";
import { requestUser, requestRestaurant, editRestaurant } from "../../ducks/reducer";
import "./RestaurantProfile.css"

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editForm: false,
        restaurant_name:"",
        owner_name:"",
        address:"",
        city:"",
        state:"",
        zip:0,
        phone:"",
        email:"",
        cover_image:"",
        restaurant_type:"",
        file:"",
        imagePreviewUrl: "",
        downloadURL: "",
  
    };
    this.showForm=this.showForm.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
    this.processImageUpload=this.processImageUpload.bind(this);
  }
  componentDidMount() {
    this.props.requestUser().then(() => this.props.requestRestaurant(this.props.user.user_id)).then(this.setState({
        restaurant_name:this.props.restaurant[0].restaurant_name,
        owner_name:this.props.restaurant[0].owner_name,
        address:this.props.restaurant[0].address,
        city:this.props.restaurant[0].city,
        state:this.props.restaurant[0].state,
        zip:this.props.restaurant[0].zip,
        phone:this.props.restaurant[0].phone,
        email:this.props.restaurant[0].email,
        cover_image:this.props.restaurant[0].cover_image,
        restaurant_type:this.props.restaurant[0].restaurant_type,
        imagePreviewUrl:this.props.restaurant[0].cover_image,
        downloadURL:this.props.restaurant[0].cover_image
    }));

  }

  showForm(e) {
   this.state.editForm ? 
   this.setState({editForm:false}):this.setState({editForm:true});
  }
  onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
  onSubmit(e){
    e.preventDefault();
    // this.uploadImage(e)
    let url = (this.state.restaurant_name + "-" + this.state.city).toLowerCase().replace(/ /g, "-")
    // .replace(/'/g, "");
    let that = this;
    let file = this.state.file;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child("coverImage/" + file.name).put(file);
    uploadTask.on("state_changed", snapshot => {}, function(error) {}, function() {
        console.log(uploadTask.snapshot.downloadURL);
        that.setState({ downloadURL: uploadTask.snapshot.downloadURL });
        that.props
          .editRestaurant({
            user_id: that.props.user.user_id,
            restaurant_name: that.state.restaurant_name,
            address: that.state.address,
            city: that.state.city,
            state: that.state.state,
            zip: that.state.zip,
            phone: that.state.phone,
            email: that.state.email,
            cover_image: uploadTask.snapshot.downloadURL,
            restaurant_type: that.state.restaurant_type,
            restaurant_url: url
          })
          .then(() =>
            that.setState({
              editForm: false,
              restaurant_name: that.props.restaurant[0].restaurant_name,
              address: that.props.restaurant[0].address,
              city: that.props.restaurant[0].city,
              state: that.props.restaurant[0].state,
              zip: that.props.restaurant[0].zip,
              phone: that.props.restaurant[0].phone,
              email: that.props.restaurant[0].email,
              cover_image: that.props.restaurant[0].cover_image,
              restaurant_type: that.props.restaurant[0].restaurant_type
            })
          );
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
        }
        reader.readAsDataURL(file)
    }
  uploadImage(event) {
    let that = this;
      event.preventDefault();
      let file = this.state.file;
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child('coverImage/' + file.name).put(file);
      uploadTask.on('state_changed', (snapshot) => {}, function(error) {}, function() {
        console.log(uploadTask.snapshot.downloadURL);
        that.setState({downloadURL : uploadTask.snapshot.downloadURL});
      })}

  render(){
    const restaurant = this.props.restaurant[0];
    let imagePreview = null;
    // let downloadURL = null;
    if (this.state.imagePreviewUrl) {imagePreview = (<img src={this.state.imagePreviewUrl} className = "image-preview" alt="Cover" style={{maxWidth:"300px", height: "auto"}}/>)};
    // if (this.state.downloadURL) {downloadURL = (<h1> {this.state.downloadURL} </h1>)};
    return <div>
        <Segment basic style={{height:"7.5rem"}}>
        <Header size="large" textAlign="left">
          Restaurant Profile
        </Header>
        <Button content="Edit Profile" icon="wrench" labelPosition="left" size="medium" floated="left" onClick={this.showForm} style={{ width: "11rem", height: "2.25rem" }} />
        </Segment>
        {/* <button onClick={this.showForm}>Edit</button> */}
        {!this.state.editForm && <section>
            <Container fluid textAlign="justified">
              <Header as="h3">Name</Header>
              <span>{this.state.restaurant_name}</span>
            </Container>
            <Container fluid textAlign="justified">
              <Header as="h3">Address</Header>
              <span>{this.state.address}</span>
              <br />
              <span>
                {this.state.city},{this.state.state} {this.state.zip}{" "}
              </span>
            </Container>
            <Container fluid textAlign="justified">
              <Header as="h3">Contact Information</Header>
              <span className="title">Phone:</span>
              <span>{this.state.phone}</span>
              <br />
              <span className="title">Email:</span>
              <span>{this.state.email}</span>
            </Container>
            <Container fluid textAlign="justified">
              <Header as="h3">Type</Header>
              <span>{this.state.restaurant_type}</span>
            </Container>
            <Container fluid textAlign="justified">
              <Header as="h3">Cover Image</Header>
              <br />
              <img src={this.state.cover_image} alt="cover not showing" className="CoverImage" />
            </Container>
          </section>}
        {this.state.editForm && <form onSubmit={this.onSubmit}>
            <h1>{restaurant.restaurant_name}</h1>
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
              <label>
                Restaurant Type:
                <input type="text" name="restaurant_type" value={this.state.restaurant_type} onChange={this.onChange} />
              </label>
              <label>
                {imagePreview}
                <input type="file" onChange={event => {
                    this.processImageUpload(event);
                  }} alt="preview image" />
              </label>
              <input type="submit" value="Submit" className="Submit-Button" />
            </div>
          </form>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser, requestRestaurant, editRestaurant })(RestaurantProfile);
