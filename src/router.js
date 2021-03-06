import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Results from './components/Results/Results';
import UserProfile from './components/UserProfile/UserProfile';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/results" component={Results} />
    <Route path="/user" component={UserProfile} />
    <Route path="/eat/:restaurantURL" component={RestaurantPage} />
  </Switch>
);
