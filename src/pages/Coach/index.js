import {
  Table,
  Typography,
  Button,
  DatePicker,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { dateFormat } from "../../utils";

export default function Coach() {
  const columns = [
    {
      title: "Biển số xe",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Loại xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuyến vận chuyển",
      dataIndex: "schedule",
      key: "schedule",
    },
    {
      title: "Vị trí xe",
      dataIndex: "position",
      key: "position",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-news_table_button">
          <Button type="primary">Xóa</Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];

  const columnsTypeCoach = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Loại xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sơ đồ ghế",
      dataIndex: "schema",
      key: "schema",
    },
    {
      title: "",
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-recruit_table_button">
          <Button type="primary" onClick={handleDeleteType}>
            Xóa
          </Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];
  const listCoachType = new Array(3).fill({
    id: "1",
    name: "Xe 36 chỗ",
    schema: "sơ đồ 1",
  });

  const listCoach = new Array(3).fill({
    id: "24.359",
    name: "Xe giường năm",
    schedule: "Sài gòn -> đà nẵng",
    position: "Vị trí 1",
  });
  const { Title } = Typography;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = (data) => {
    console.log(data);
    notification.open({
      message: "Tạo thành công",
    });
    handleClose();
  };

  const handleDeleteType = () => {
    notification.open({
      message: "Xóa thành công",
    });
  };
  return (
    <div className="p-coach">
      <Title level={2}>Quản lí xe</Title>
      <div className="p-coach_titleWrap">
        <div className="p-coach_typeFilter">
          <Title level={5}>Trạng thái xe theo ngày</Title>
          <DatePicker
            defaultValue={moment("09/09/2022", dateFormat)}
            format={dateFormat}
          />
        </div>
        <div className="p-coach_typeCoach">
          <div className="p-coach_typeCoach_header">
            <Title level={5}>Loại xe</Title>
            <Button type="primary" onClick={handleOpen}>
              Tạo mới
            </Button>
          </div>
          <Table columns={columnsTypeCoach} dataSource={listCoachType}></Table>
        </div>
      </div>

      <div className="p-coach_tableDetail">
        <Table dataSource={listCoach} columns={columns} />
      </div>

      <div className="p-coach_modalTypeCoach">
        <Modal
          title="Tọa loại xe mới"
          visible={open}
          onCancel={handleClose}
          footer={[
            <>
              <Button onClick={handleClose}>Hủy</Button>
              <Button htmlType="submit" form="formTypeCoach">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form onFinish={onFinish} id="formTypeCoach" layout="vertical">
            <Form.Item label="Loại xe" name="name">
              <Input placeholder="Nhập loại xe" />
            </Form.Item>
            <Form.Item label="Sơ đồ ghế" name="schema">
              <Input placeholder="Nhập sơ đồ ghế" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
