import React, { Component } from 'react';
import axios from 'axios';


import {connect} from 'react-redux';
import './Home.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(){
        window.location.href="http://localhost:3001/login"
    }
    componentWillMount(){
                axios.get("/api/me").then(response => {
                  if (!response.data) this.setState({
                      user: null
                    });
                  else this.setState({ user: response.data });
                });
    }
    // componentDidMount(){

    // }
    render(){
        return (
        <div>
            <header>
              <nav>
                <i className="fa fa-cutlery fa-2x" aria-hidden="true" />
                <button onClick={this.handleLogin} className="pure-button pure-button-primary">Log In</button>
              </nav>
            </header>
            <main>
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="City Or State"/>
                    <button type="submit" className="searchButton">
                    <i className="fa fa-search"></i>
                    </button>
                </div>
            </main>
          </div>
          )
    }
}
function mapStateToProps(state) {
  return {
    state
  };
}
export default connect( mapStateToProps )( Home );