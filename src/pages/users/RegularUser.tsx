import { Fragment } from 'react';
//import { ifExpire } from '../../utils/auth';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../Login';
import { Form, Input, Button, Card } from 'antd';
import { changeName, logout } from '../../slices/auth';
import { getAuth } from '../../selectors';
//import jwt_decode from 'jwt-decode';

function RegularUser() {

    const {user, loggedIn, authenticatedIn} = useSelector(getAuth);

    const dispatch = useDispatch();

    function HandleLogout() {
        dispatch(logout());
    }

    //console.log("If token expired: ", ifExpire());

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
    const onFinish = (values: any) => {
        dispatch(changeName(values.username));
    }

    let welcomeMessage = !loggedIn ? '' :
    <Card title="Manager" className="manager">
        <h3>Welcome Back, {user}</h3>
        <Form
            name="second_login"
            onFinish = {onFinish}

        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input a username!' }]}
            >
            <Input
                type="username"
                placeholder="username"
            />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Change Name
                </Button>
            </Form.Item>

            <Button type="primary" className="btn btn-primary" hidden={!authenticatedIn}>
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
            <Button type="primary" className="btn btn-primary" onClick={HandleLogout} >
                Logout
            </Button>
        </Form>
    </Card>

    return  (
        <Fragment>
            { welcomeMessage }
            <Route path="/login" component={Login} />
            {reDirect}
        </Fragment>
    )

}

export default RegularUser;
