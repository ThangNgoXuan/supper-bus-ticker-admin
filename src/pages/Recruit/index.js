import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Table,
  Typography,
} from "antd";
import React, { useState } from "react";
import moment from "moment";
import { dateFormat } from "../../utils";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Recruit() {
  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const columns = [
    {
      title: "Tên công việc",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Mô tả công việc",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Số lượng",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Thời gian hết hạn",
      dataIndex: "dule",
      key: "dule",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-recruit_table_button">
          <Button onClick={handleDelete} type="primary">
            Xóa
          </Button>
          <Button onClick={showModalUpdate} type="primary">
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  // Get data
  const listData = new Array(30).fill({
    key: 1,
    name: `Frontent`,
    salary: `15.000.000`,
    dule: "30/09/2022",
    total: 30,
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  });

  // HandleDelete
  const handleDelete = () => {
    notification.open({
      message: "Xóa thành công",
    });
  };

  // Pagination Table
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  // Modal Add New
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (data) => {
    console.log(data);
    notification.open({
      message: "Thêm thành công",
    });
    handleCancel();
  };

  // Modal Update
  const showModalUpdate = () => {
    setIsModalUpdateOpen(true);
  };

  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  const onFinishUpdate = (data) => {
    console.log(data);
    notification.open({
      message: "Cập nhật thành công",
    });
    handleCancelUpdate();
  };

  return (
    <div className="p-recruit">
      <div className="p-recruit_title">
        <Title level={4}>Việc làm hiện có:</Title>
        <Button type="primary" onClick={showModal}>
          Thêm mới
        </Button>
      </div>
      <div className="p-recruit_table">
        <Table
          columns={columns}
          dataSource={listData}
          pagination={tableParams.pagination}
          handleTableChange={handleTableChange}
        />
      </div>
      <div className="p-recruit_modal">
        <Modal
          title="Thêm công việc mới"
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button form="formRecruit" htmlType="submit">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form id="formRecruit" onFinish={onFinish}>
            <div className="p-recruit_modal_field">
              <div className="p-recruit_modal_field-input">
                <Title level={5}>Tên việc làm</Title>
                <Form.Item name="name">
                  <Input
                    placeholder="Nhập tên việc làm (*)"
                    rules={[
                      {
                        require: true,
                        message: "Vui lòng tên việc làm",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="p-recruit_modal_field-input">
                <Title level={5}>Lương</Title>
                <Form.Item
                  name="salary"
                  rules={[
                    {
                      require: true,
                      message: "Vui lòng nhập số tiền lương",
                    },
                  ]}
                >
                  <Input placeholder="Nhập lương (*)" type="number" />
                </Form.Item>
              </div>
            </div>
            <div className="p-recruit_modal_field">
              <div className="p-recruit_modal_field-input">
                <Title level={5}>Ngày hết hạn</Title>
                <Form.Item
                  name="date"
                  rules={[
                    {
                      require: true,
                      message: "Vui lòng nhập ngày hết hạn",
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={moment("09/09/2022", dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="p-recruit_modal_field">
              <div className="p-recruit_modal_field-textarea">
                <Title level={5}>Mô tả công việc</Title>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      require: true,
                      message: "Vui lòng nhập nội dung công việc",
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
            </div>
          </Form>
        </Modal>
      </div>

      <div className="p-recruit_modalUpdate">
        <Modal
          title="Cập nhật thông tin công việc"
          visible={isModalUpdateOpen}
          onCancel={handleCancelUpdate}
          footer={[
            <>
              <Button onClick={handleCancelUpdate}>Hủy</Button>
              <Button form="formRecruitUpdate" htmlType="submit">
                Cập nhật
              </Button>
            </>,
          ]}
        >
          <Form id="formRecruitUpdate" onFinish={onFinishUpdate}>
            <div className="p-recruit_modal_field">
              <div className="p-recruit_modal_field-input">
                <Title level={5}>Tên việc làm</Title>
                <Form.Item name="name">
                  <Input
                    placeholder="Nhập tên việc làm (*)"
                    rules={[
                      {
                        require: true,
                        message: "Vui lòng tên việc làm",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="p-recruit_modal_field-input">
                <Title level={5}>Lương</Title>
                <Form.Item
                  name="salary"
                  rules={[
                    {
                      require: true,
                      message: "Vui lòng nhập số tiền lương",
                    },
                  ]}
                >
                  <Input placeholder="Nhập lương (*)" type="number" />
                </Form.Item>
              </div>
            </div>
            <div className="p-recruit_modal_field">
              <div className="p-recruit_modal_field-input">
                <Title level={5}>Ngày hết hạn</Title>
                <Form.Item
                  name="date"
                  rules={[
                    {
                      require: true,
                      message: "Vui lòng nhập ngày hết hạn",
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={moment("09/09/2022", dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="p-recruit_modal_field">
              <div className="p-recruit_modal_field-textarea">
                <Title level={5}>Mô tả công việc</Title>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      require: true,
                      message: "Vui lòng nhập nội dung công việc",
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
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
