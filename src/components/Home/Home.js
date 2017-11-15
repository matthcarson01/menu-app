import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div>
            <header>
              <nav>
                <i className="fa fa-cutlery fa-2x" aria-hidden="true" />
                <button className="pure-button pure-button-primary">
                  Log In
                </button>
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