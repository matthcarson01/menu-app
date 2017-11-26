import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";


import { requestUser, requestRestaurant } from "../../ducks/reducer";

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
        restaurant_type:""
    };
    this.showForm=this.showForm.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
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
        restaurant_type:this.props.restaurant[0].restaurant_type
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
    axios.put(`/api/user_restaurant_edit/${this.props.user.user_id}`,{
        restaurant_name:this.state.restaurant_name,
        owner_name:this.state.owner_name,
        address:this.state.address,
        city:this.state.city,
        state:this.state.state,
        zip:this.state.zip,
        phone:this.state.phone,
        email:this.state.email,
        cover_image:this.state.cover_image,
        restaurant_type:this.state.restaurant_type
    })
        .then(this.setState({editForm:false}));
  }

  render() {
    const restaurant = this.props.restaurant[0];
    return <div>
        <button onClick={this.showForm}>Edit</button>
        {!this.state.editForm && <section>
            <h1>{restaurant.restaurant_name}</h1>
            <div>
              Name:<span>{this.state.restaurant_name}</span>
            </div>
            <div>
              Address:<span>{this.state.address}</span>
            </div>
            <div>
              City:<span>{this.state.city}</span>
            </div>
            <div>
              Zip:<span>{this.state.zip}</span>
            </div>
            <div>
              Phone:<span>{this.state.phone}</span>
            </div>
            <div>
              Email:<span>{this.state.email}</span>
            </div>
            <div>
              Type:<span>{this.state.restaurant_type}</span>
            </div>
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
              <input type="submit" value="Submit" className="Submit-Button" />
            </div>
          </form>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser, requestRestaurant })(RestaurantProfile);
