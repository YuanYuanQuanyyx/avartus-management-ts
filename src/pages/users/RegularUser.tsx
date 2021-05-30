import React, { Fragment } from 'react';
//import { ifExpire } from '../../utils/auth';
import { userActions } from '../../store/actions/users';
import { Redirect, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../Login';
import { Button } from 'antd';
//import jwt_decode from 'jwt-decode';

class RegularUser extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
    }

    render() {

        //console.log("If token expired: ", ifExpire());
        const { loggedIn, user, authorizedIn } = this.props;
        let reDirect = !loggedIn ? <Redirect to='/login' push /> : '';
        /*
        const token = localStorage.getItem('token');
        let ifAuthorized: boolean = false;
        if (token != null) {
            var decodedToken:any = jwt_decode(token);
            if (decodedToken.trust_level === "11") {
                ifAuthorized = true;
            }
        }
        */

        let welcomeMessage = !loggedIn ? '' :
        <div>
            <h3>Welcome Back, {user}</h3>
            <Button type="primary" className="btn btn-primary" hidden={!authorizedIn}>
                User
            </Button>
            <p/>
            <Button type="primary" className="btn btn-primary">
                Cloud
            </Button>
            <p/>
            <Button type="primary" className="btn btn-primary">
                Dgraph
            </Button>
            <p/>
            <Button type="primary" className="btn btn-primary" onClick={this.handleLogout} >
                Logout
            </Button>
        </div>;

        return  (
            <Fragment>
                { welcomeMessage }
                <Route path="/login" component={Login} />
                { reDirect }
            </Fragment>
        )
    }
}

function mapStateToProps(state: any) {
    console.log("App state: ", state);
    const { loggedIn, user, authorizedIn } = state.authentication;
    return {
        ...state,
        loggedIn,
        user,
        authorizedIn
    };
  }

export default withRouter(connect(mapStateToProps)(RegularUser));
