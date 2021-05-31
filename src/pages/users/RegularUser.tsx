import { Fragment } from 'react';
//import { ifExpire } from '../../utils/auth';
import { userActions } from '../../store/actions/users';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../Login';
import { RootState } from '../../store/state/users';
import { Form, Input, Button, Card } from 'antd';
//import jwt_decode from 'jwt-decode';

function RegularUser() {

    const user = useSelector((state:RootState) => state.authentication.user);
    const loggedIn = useSelector((state:RootState) => state.authentication.loggedIn);
    const authorizedIn = useSelector((state:RootState) => state.authentication.authorizedIn);

    const dispatch = useDispatch();

    function HandleLogout() {
        dispatch(userActions.logout());
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
        dispatch(userActions.changeName(values.username));
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
