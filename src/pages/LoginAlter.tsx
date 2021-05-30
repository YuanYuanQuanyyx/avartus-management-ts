import React, { ReactElement } from 'react'
import { Form, Input, Card, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './login.css';
import { userActions } from '../store/actions/users';
import { useDispatch } from 'react-redux';

const LoginAlter: React.FC = ({

}): ReactElement => {

        const onFinish = (values: any) => {
            console.log('Received values of form: ', values);
            const dispatch = useDispatch();
            dispatch(userActions.login(values.username, values.password, false));
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

export default withRouter(LoginAlter);


