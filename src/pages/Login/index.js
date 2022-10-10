import { Button, Form, Image, Input, Typography } from "antd";
import React from "react";
import authApi from "../../api/auth";
const { Text, Title } = Typography;

export default function Login() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    authApi
      .login(values)
      .then(({ data }) => {
        // if(data.status){

        // }
        console.log({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-login">
      <div className="p-login_left">
        <Image src="https://picsum.photos/200" preview={false} />
      </div>
      <div className="p-login_right">
        <div className="p-login_right_title">
          <Title level={4}>Bus Ticket - Đăng nhập</Title>
          <Text>Xin chào, vui lòng nhập thông tin đăng nhập</Text>
        </div>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập",
              },
            ]}
          >
            <Input size="large" placeholder="Vui lòng nhập tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu  ",
              },
            ]}
          >
            <Input.Password size="large" placeholder="Mật khẩu" />
          </Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
}
