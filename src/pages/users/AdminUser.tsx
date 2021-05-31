import { Form, Input, Button, Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './admin.css';
import QRcode from './twoAuth.png'
import { userActions } from '../../store/actions/users';
import { useDispatch } from 'react-redux';

function AdminUser() {

    const dispatch = useDispatch();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        dispatch(userActions.authorize(localStorage.getItem('otp_uuid'), values.pin));
    };

    return  (
        <Card title="Login SYS" className="second-login-card">
            <img width={200} src={QRcode} alt='2FA QR'/>
            <Form
                name="second_login"
                onFinish = {onFinish}

            >
                <Form.Item
                    name="pin"
                    rules={[{ required: true, message: 'Please input your Pin!' }]}
                >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="pin"
                    placeholder="Pin"
                />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default AdminUser;
