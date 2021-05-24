import React from 'react'
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './admin.css'
import { getOtp_uuid } from '../../utils/auth'
import QRcode from './twoAuth.png'
import { loginApi } from '../../services/auth';
import { setToken } from '../../utils/auth';

class AdminUser extends React.Component<any, any> {

    secondLogin = (form: any) => {
        var data = {
            "args":{
                "otp_uuid": getOtp_uuid(),
                "otp": form.pin
            }
        }
        console.log(data);
        loginApi(data)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                if (res.data.result.token) {
                    setToken(res.data.result.token)
                    this.props.history.push('/users/regular')
                }
            }
          }, (error) => {
            console.log(error);
            message.error("Incorrect Pin!")
          });
    }

    render() {
        return  (
            <Card title="Login SYS" className="second-login-card">
                <img width={200} src={QRcode} alt='2FA QR'/>
                <Form
                    name="second_login"
                    onFinish = {this.secondLogin}

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
}

export default AdminUser
