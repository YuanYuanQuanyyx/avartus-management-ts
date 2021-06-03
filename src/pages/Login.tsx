import { Form, Input, Card, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import { useDispatch} from 'react-redux';
import { loginRequest } from '../slices/auth';

function Login () {

    const dispatch = useDispatch();

    const OnFinish = (users: any) => {
        console.log('Received values of form: ', users);
        dispatch(loginRequest(users));
    };

    return (
        <Card title="Login SYS" className="login-card">
            <Form
                name="login"
                onFinish = {OnFinish}
                initialValues={{ remember: true }}
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
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me for 30 days</Checkbox>
                    </Form.Item>
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

export default Login;
