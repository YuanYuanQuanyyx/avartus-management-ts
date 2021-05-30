import React, { Fragment, ReactElement } from 'react';
//import { ifExpire } from '../../utils/auth';
import { userActions } from '../../store/actions/users';
import { Redirect, withRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login';
import { Button } from 'antd';
import jwt_decode from 'jwt-decode';
import { RootState } from '../../store/state/users';

const RegularUser: React.FC = ({

}): ReactElement => {

    const handleLogout = () => {
        const dispatch = useDispatch();
        dispatch(userActions.logout());
    }

    //console.log("If token expired: ", ifExpire());
    const loggedIn = useSelector((state: RootState) => state.loggedIn);
    const user = useSelector((state: RootState) => state.user);
    const authorizedIn = useSelector((state: RootState) => state.authorizedIn);

    let reDirect = !loggedIn ? <Redirect to='/login' push /> : '';

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
        <Button type="primary" className="btn btn-primary" onClick={handleLogout} >
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

export default withRouter(RegularUser);


