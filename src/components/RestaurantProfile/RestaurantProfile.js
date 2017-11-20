import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import { requestUser, requestRestaurant } from "../../ducks/reducer";

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editForm: false
    };
    this.showForm=this.showForm.bind(this);
  }
  componentDidMount() {
    this.props.requestUser().then(() => this.props.requestRestaurant(this.props.user.user_id));
  }
  showForm(e) {
   this.state.editForm ? this.setState({editForm:false}):this.setState({editForm:true});
  }

  render() {
    const restaurant = this.props.restaurant[0];
    return <div>
        <button onClick={this.showForm}>Edit</button>
        {!this.state.editForm && <section>
            <h1>{restaurant.restaurant_name}</h1>
            <div>
              Name:<span>{restaurant.restaurant_name}</span>
            </div>
            <div>
              Address:<span>{restaurant.address}</span>
            </div>
            <div>
              City:<span>{restaurant.city}</span>
            </div>
            <div>
                Zip:<span>{restaurant.zip}</span>
            </div>
            <div>
                Phone:<span>{restaurant.phone}</span>
            </div>
            <div>
              Email:<span>{restaurant.email}</span>
            </div>
            <div>
              Type:<span>{restaurant.restaurant_type}</span>
            </div>
          </section>}
        {this.state.editForm && <form onSubmit={this.onSubmit}>
            <h1>{restaurant.restaurant_name}</h1>
            <div className="form-group">
              <label>
                Name:
                <input type="text" name="restaurant_name" value={restaurant.restaurant_name} onChange={this.onChange} />
              </label>
              <label>
                Address:
                <input type="text" name="address" value={restaurant.address} onChange={this.onChange} />
              </label>
              <label>
                City:
                <input type="text" name="city" value={restaurant.city} onChange={this.onChange} />
              </label>
              <label>
                State:
                <input type="text" name="state" value={restaurant.state} onChange={this.onChange} />
              </label>
              <label>
                Zip:
                <input type="number" name="zip" value={restaurant.zip} onChange={this.onChange} />
              </label>
              <label>
                Phone:
                <input type="text" name="phone" value={restaurant.phone} onChange={this.onChange} />
              </label>
              <label>
                Email:
                <input type="text" name="email" value={restaurant.email} onChange={this.onChange} />
              </label>
              <label>
                Restaurant Type:
                <input type="text" name="restaurant_type" value={restaurant.restaurant_type} onChange={this.onChange} />
              </label>
              <input type="submit" value="Submit" className="Submit-Button" />
            </div>
          </form>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser, requestRestaurant })(RestaurantProfile);
