import { Button, Form, Input, notification, Typography } from "antd";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function ContactUs() {
  const { Title } = Typography;

  const onFinish = (data) => {
    console.log(data);
    notification.open({
      message: "Cập nhật thành công",
    });
  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Quản lí trang Liên hệ</Title>
      </div>
      <Form
        onFinish={onFinish}
        style={{
          marginTop: "20px",
        }}
        layout="vertical"
        initialValues={{
          title: "",
          subTitle: "",
          titleMap: "",
          contentMap: "",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề lớn",
            },
          ]}
        >
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>
        <Form.Item
          name="subTitle"
          label="SubTitle"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề nhỏ",
            },
          ]}
        >
          <Input placeholder="Vui lòng nhập tiêu đề" />
        </Form.Item>
        <Form.Item
          label="Title Map"
          name="titleMap"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề map",
            },
          ]}
        >
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>
        <Form.Item
          label="Content Map"
          name="content"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung",
            },
          ]}
          valuePropName="data"
          getValueFromEvent={(even, editor) => {
            const data = editor.getData();
            return data;
          }}
        >
          <CKEditor editor={ClassicEditor} />
        </Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}
