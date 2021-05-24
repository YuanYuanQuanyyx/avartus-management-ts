import React from 'react'
import { Form, Input, Card, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken, setOtp_uuid } from '../utils/auth';
import { withRouter } from 'react-router-dom';
import { loginApi } from '../services/auth';
import './login.css';
//import setAuthorization from '../utils/setAuthorizationToken';

class Login extends React.Component<any, any> {

    login = (form: any) => {
        var data = {
            "args":{
                "email": form.username,
                "password": form.password
            }
        }
        console.log(data);
        loginApi(data)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                if (res.data.result.otp_uuid) {
                    setOtp_uuid(res.data.result.otp_uuid)
                    this.props.history.push('/users/admin')
                } else if (res.data.result.token) {
                    setToken(res.data.result.token)
                    //setAuthorization(res.data.result.token);
                    this.props.history.push('/users/regular')
                }
            }
        })
        .catch((error) => {
            console.log(error);
            message.error("Incorrect username or password!")
        })
    }

    render() {
        return (
            <Card title="Login SYS" className="login-card">
                <Form
                    name="login"
                    onFinish = {this.login}

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

export default withRouter(Login)
