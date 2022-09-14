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
    })
  };

  return (
    <div className="p-contactUs">
      <div className="p-contactUs_form">
        <Form onFinish={onFinish}>
          <div className="p-contactUs_form_field">
            <Title level={2}>Tiêu đề trang Liên hệ</Title>
            <Title level={5}>Tiêu đề lớn</Title>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề lớn",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập tiêu đề" />
            </Form.Item>
            <div className="p-contactUs_form_field-content">
              <Title level={5}>Tiêu đề nhỏ</Title>
              <Form.Item
                name="subTitle"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề nhỏ",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập tiêu đề" />
              </Form.Item>
            </div>
          </div>
          <div className="p-contactUs_form_field">
            <Title level={2}>Map</Title>
            <Title level={5}>Tiêu đề Map</Title>
            <Form.Item
              name="titleMap"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề map",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập tiêu đề" />
            </Form.Item>
            <div className="p-contactUs_form_field-content">
              <Title level={5}>Nội dung map</Title>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung",
                  },
                ]}
                valuePropName="data"
                initialValue="{descriptionDefault}"
                getValueFromEvent={(even, editor) => {
                  const data = editor.getData();
                  return data;
                }}
              >
                <CKEditor editor={ClassicEditor} />
              </Form.Item>
            </div>
            <div className="p-aboutUs_form_button">
              <Button size="large" type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
