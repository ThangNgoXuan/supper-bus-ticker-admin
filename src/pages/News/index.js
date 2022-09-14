import React, { useState } from "react";
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
import moment from "moment";
import { dateFormat } from "../../utils";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function News() {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày đăng",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-news_table_button">
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

  const listData = new Array(30).fill({
    id: 1,
    title: `Bài viết một`,
    date: "20/09/2022",
    content:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  });

  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  // HandleDelete
  const handleDelete = () => {
    notification.open({
      message: 'Xóa thành công',
    })
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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const submitNew = (data) => {
    console.log(data);
    notification.open({
      message: "Thêm thành công",
    })
    handleCancel();
  };

  // Modal Update
  const showModalUpdate = () => {
    setIsModalUpdateOpen(true);
  };

  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  };


  const submitNewsUpdate = (data) => {
    console.log(data);
    notification.open({
      message: "Cập nhật thành công",
    })
    handleCancelUpdate();
  };

  return (
    <div className="p-news">
      <div className="p-news_title">
        <Title level={4}>Tin tức:</Title>
        <Button type="primary" onClick={showModal}>
          Thêm mới
        </Button>
      </div>
      <div className="p-news_table">
        <Table
          columns={columns}
          dataSource={listData}
          pagination={tableParams.pagination}
          handleTableChange={handleTableChange}
        />
      </div>
      <div className="p-news_modal">
        <Modal
          title="Thêm tin tức mới"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button htmlType="submit" form="formNew">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form onFinish={submitNew} id="formNew">
            <div className="p-news_modal_field">
              <div className="p-news_modal_field-input">
                <Title level={5}>Tiêu đề (*)</Title>
                <Form.Item
                  name="titel"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tiêu đề(*)" />
                </Form.Item>
              </div>
            </div>
            <div className="p-news_modal_field">
              <div className="p-news_modal_field-input">
                <Title level={5}>Ngày tạo</Title>
                <Form.Item name="date">
                  <DatePicker
                    defaultValue={moment("09/09/2022", dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="p-news_modal_field">
              <div className="p-news_modal_field-textarea">
                <Title level={5}>Nội dung bài viết (*)</Title>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true, 
                      message: "Vui lòng nhập tiêu đề",
                    },
                  ]}
                  valuePropName="data"
                  initialValue="nội dung bài viết"
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
      <div className="p-modal_update">
      <Modal
          title="Cập nhật thông tin tin tức"
          visible={isModalUpdateOpen}
          onCancel={handleCancelUpdate}
          footer={[
            <>
              <Button onClick={handleCancelUpdate}>Hủy</Button>
              <Button htmlType="submit" form="formNewUpdate">
                Cập nhật
              </Button>
            </>,
          ]}
        >
          <Form onFinish={submitNewsUpdate} id="formNewUpdate">
            <div className="p-news_modal_field">
              <div className="p-news_modal_field-input">
                <Title level={5}>Tiêu đề (*)</Title>
                <Form.Item
                  name="titel"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tiêu đề(*)" />
                </Form.Item>
              </div>
            </div>
            <div className="p-news_modal_field">
              <div className="p-news_modal_field-input">
                <Title level={5}>Ngày tạo</Title>
                <Form.Item name="date">
                  <DatePicker
                    defaultValue={moment("09/09/2022", dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="p-news_modal_field">
              <div className="p-news_modal_field-textarea">
                <Title level={5}>Nội dung bài viết (*)</Title>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true, 
                      message: "Vui lòng nhập tiêu đề",
                    },
                  ]}
                  valuePropName="data"
                  initialValue="nội dung bài viết"
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
