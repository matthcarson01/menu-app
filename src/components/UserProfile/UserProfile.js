import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";

import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Restaurant from '../Restaurant/Restaurant';
import Menu from '../Menu/Menu';
import './UserProfile.css';

class UserProfile extends Component{

    render(){
        return <div className="flex-container">
            <Header />
            <div className="flex-container box-eighty">
              <header className="profile-header">
                <h3>User Settings</h3>
              </header>
              <nav className="profile-nav">
                <ul>
                  <li><Link to='user-profile'>User</Link></li>
                  <li><Link to='restaurant'>Restaurant</Link></li>
                  <li><Link to='menu'>Menu</Link></li>
                </ul>
              </nav>
              <main>
                <Switch>
                  <Route path="/user/user-profile" component={Profile} />
                  <Route path="/user/restaurant" component={Restaurant} />
                  <Route path="/user/menu" component={Menu} />
                </Switch>
              </main>
            </div>
          </div>;
    }
}
export default UserProfile;