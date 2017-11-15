import React, { Component } from "react";
import "./Results.css";

export default class Results extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <header>
                    <nav>
                        <i className="fa fa-cutlery fa-2x" aria-hidden="true"></i>
                        <div className="search">
                            <input type="text" className="searchTerm" placeholder="City Or State"/>
                            <button type="submit" className="searchButton">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                        <button className="pure-button pure-button-primary">Log In</button>
                    </nav>
                </header>
                <main>

                </main>
            </div>
        )
    }
}
