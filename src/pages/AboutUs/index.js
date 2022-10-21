import { Typography, Input, Button, Form, notification } from "antd";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const titleDefault = "Về Bus-ticket chúng tôi";
const descriptionDefault = `

Trong năm 2021, do tác động của dịch COVID-19, việc mở rộng thanh toán không dùng tiền mặt là một trong những giải pháp được nhiều người sử dụng. Để giảm rủi ro lây nhiễm của dịch bệnh, hạn chế tiếp xúc gần, Phương Trang đã triển khai thanh toán trực tiếp tại quầy bằng ví MoMo. Khách hàng khi đến mua vé tại các quầy vé của Phương Trang có thể linh hoạt thanh toán bằng ví điện tử. Điều này sẽ giúp bảo vệ sức khỏe của quý khách khi giao dịch trực tiếp.

Hướng dẫn thanh toán bằng hình thức Mã QR

Quý khách mở ứng dụng MoMo trên điện thoại và chọn "Mã thanh toán". Mã thanh toán sẽ xuất hiện trên màn hình, quý khách chỉ cần đưa mã vào thiết bị quét để hoàn tất thanh toán.



Để quét mã thanh toán vé, quý khách chỉ cần thực hiện 3 bước đơn giản:

Bước 1: Chọn "Mã Thanh Toán"
Bước 2: Đưa mã vào máy quét
Bước 3: Thanh toán hoàn tất

Những lợi ích vượt trội của thanh toán qua ví điện tử dành cho khách hàng:

Không chạm: Hạn chế đụng chạm vào thiết bị thanh toán;
Không tiếp xúc: Chỉ cần chạm nhẹ thẻ tại thiết bị thanh toán tại quầy thu ngân để trả tiền mà không cần quẹt thẻ hay nhập mã PIN;
Không tiền mặt: Giảm thiểu khả năng lây nhiễm trong cộng đồng;
Ưu đãi hấp dẫn: Ví MoMo cùng Phương Trang liên tục mang tới nhiều chương trình khuyến mãi hấp dẫn dành cho quý khách.

Lưu ý: Khi làm thủ tục quét mã QR thanh toán tại quầy quý khách cần thực hiện đúng và đầy đủ các biện pháp dưới đây để đảm bảo sử dụng thẻ an toàn:

Đảm bảo thẻ luôn nằm trong tầm kiểm soát của quý khách;
Không đặt thẻ ở cự ly gần với thiết bị quét thẻ;
Thực hiện các biện pháp cần thiết để ngăn ngừa các giao dịch thẻ phát sinh ngoài ý muốn khi thẻ vẫn nằm trong dụng cụ đựng thẻ của khách hàng;
Thường xuyên kiểm tra các tin nhắn thông báo giao dịch của ngân hàng để kiểm tra số tiền đã thanh toán qua thẻ, đồng thời có trách nhiệm thông báo ngay cho ngân hàng qua Hotline 24/7 hoặc các Chi nhánh/ PGD của ngân hàng khi phát sinh giao dịch thẻ ngoài ý muốn.`;

export default function AboutUs() {
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
        <Title level={4}>Quản lí trang về chúng tôi</Title>
      </div>
      <Form onFinish={onFinish} layout="vertical"
        style={{marginTop: '20px'}}
        initialValues={{
          title: titleDefault,
          content: descriptionDefault,
        }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề",
            },
          ]}
        >
          <Input
            placeholder="Nhập tiêu đề"
          />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="content"
          rules={[
            {
              require: true,
              message: "Vui lòng nhập nội dung!",
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
