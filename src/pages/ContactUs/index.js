import { Input, Typography } from "antd";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function ContactUs() {
  const { Title } = Typography;

  return (
    <div className="p-contactUs">
      <div className="p-contactUs_form">
        <div className="p-contactUs_form_field">
          <Title level={2}>Tiêu đề trang Liên hệ</Title>
          <Title level={5}>Tiêu đề lớn</Title>
          <Input placeholder="Vui lòng nhập tiêu đề" />
          <div className="p-contactUs_form_field-content">
            <Title level={5}>Tiêu đề nhỏ</Title>
            <Input placeholder="Vui lòng nhập tiêu đề" />
          </div>
        </div>
        <div className="p-contactUs_form_field">
          <Title level={2}>Map</Title>
          <Title level={5}>Tiêu đề Map</Title>
          <Input placeholder="Vui lòng nhập tiêu đề" />
          <div className="p-contactUs_form_field-content">
            <Title level={5}>Nội dung map</Title>
            <CKEditor editor={ClassicEditor} />
          </div>
        </div>
      </div>
    </div>
  );
}
