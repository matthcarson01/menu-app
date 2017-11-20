import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

import { requestUser } from "../../ducks/reducer";

class RestaurantFrom extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant_name:'',
            owner_name: this.props.user.user_name,
            address:'',
            city:'',
            state:'',
            zip:0,
            phone:'',
            email:'',
            cover_image:null,
            restaurant_type:''
            // ,
            // fireRedirect: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
    this.props.requestUser();
    console.log('user_id:',this.props.user.user_id); 
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        console.log('restaurant:',this.state)
        axios
          .post(`/api/user_restaurant/${this.props.user.user_id}`, {
            restaurant_name: this.state.restaurant_name,
            owner_name: this.state.owner_name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            phone: this.state.phone,
            email: this.state.email,
            cover_image: this.state.cover_image,
            restaurant_type: this.state.restaurant_type
          })
          .then(this.setState({ fireRedirect: true }));
    }
    render() {
        const { fireRedirect } = this.state;
        return (
        <div>
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
                <label>
                  Restaurant Type:
                  <input type="text" name="restaurant_type" value={this.state.restaurant_type} onChange={this.onChange} />
                </label>
                <input type="submit" value="Submit" className="Submit-Button" />
              </div>
            </form>
            {fireRedirect &&(<Redirect to={"/user/user-profile"} />) }
        </div>
          )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser })(RestaurantFrom);