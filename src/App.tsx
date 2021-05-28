import React, { Fragment } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Login from './pages/Login';
import RegularUser from './pages/users/RegularUser';
import AdminUser from './pages/users/AdminUser';

class App extends React.Component<any, any> {

  render() {

    const { loggedIn, authorizingIn } = this.props;
    return (
      <Fragment>
        <Route path='/login' component = {Login} />
        <Route exact path='/user/regular' component = {RegularUser}/>
        <Route exact path='/user/admin' component = {AdminUser} />
        <Redirect to='/login' from='/' />
        {!loggedIn && <Redirect to='/login' push/>}
        {authorizingIn && <Redirect to='/user/admin' push/>}
        {loggedIn && <Redirect to='/user/regular' push/>}
      </Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  console.log("App state: ", state);
  const { loggedIn, user, authorizingIn } = state.authentication;
  return {
      loggedIn,
      user,
      authorizingIn
  };
}

export default withRouter(connect(mapStateToProps)(App));
