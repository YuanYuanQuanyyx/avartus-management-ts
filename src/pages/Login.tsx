import React from 'react'
import { Form, Input, Card, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './login.css';
import { userActions } from '../actions/users';
import { connect } from 'react-redux';

class Login extends React.Component<any, any> {

    render() {
        const onFinish = (values: any) => {
            console.log('Received values of form: ', values);
            const { dispatch } = this.props;
            dispatch(userActions.login(values.username, values.password));
          };

        return (
            <Card title="Login SYS" className="login-card">
                <Form
                    name="login"
                    onFinish = {onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

}

function mapStateToProps(state: any) {
    console.log("Login state: ", state);
    const { loggedIn, user, error, authorizedIn } = state.authentication;
    return {
        loggedIn,
        user,
        error,
        authorizedIn
    };
}

export default withRouter(connect(mapStateToProps)(Login));
