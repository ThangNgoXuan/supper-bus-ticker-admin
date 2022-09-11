import { Button, Image, Typography } from "antd";
import React from "react";
import error404 from "../../assets/images/error404.svg";

export default function NotFound() {
  const { Title } = Typography;
  return (
    <div className="t-notFound">
      <div className="t-notFound_imgWrapper">
        <Image preview={false} src={error404} />
      </div>
      <div className="t-notFound_content">
        <Title level={3}>Rất tiếc, chúng tôi không tìm thấy trang này</Title>
        <div className="t-notFound_content-error">
          <Title level={5}>
            Vui lòng trở về trang chủ hoặc liên hệ với chúng tôi để được hỗ trợ.
          </Title>
        </div>
        <div className="t-notFound_btnList">
          <Button href="/" size="large" type="primary">Quay lại</Button>
        </div>
      </div>
    </div>
  );
}
