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
import useValues from "../../hooks/useValues";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import newsApi from "../../api/newApi";
import { PlusOutlined } from "@ant-design/icons";

export default function Recruit() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [values, setValues] = useValues({
    open: false,
    idUpdate: "",
  });

  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch({}, newsApi.getAllNews);

  useEffect(() => {
    fetch({}, true);
    /* eslint-disable-next-line */
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (index) => (
        <span>{(index = data.findIndex((x) => x._id === index) + 1)}</span>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Nội dung",
      dataIndex: "subtitle",
      key: "subtitle",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (index) => {
        return index ? "Hiện" : "Ẩn";
      },
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: '',
      render: (record) => (
        <div className="p-news_table_button">
          <Button
            onClick={() => {
              handleDelete(record);
            }}
            type="primary"
          >
            Xóa
          </Button>
          <Button
            onClick={() => {
              handleOpenUpdate(record);
            }}
            type="primary"
          >
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const handleOpenUpdate = (record) => {
    setValues({
      open: true,
      idUpdate: record._id,
    });
    form.setFieldsValue({
      title: record.title,
      subtitle: record.subtitle,
      thumbnail: record.thumbnail,
      content: record.content,
      slug: record.slug,
      order: record.order,
      status: record.status,
    });
  };

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
    setValues({
      open: true,
    });
  };

  const handleCancel = () => {
    setValues({
      open: false,
    });
  };

  const onFinish = (data) => {
    console.log(data);
    notification.open({
      message: "Thêm thành công",
    });
    handleCancel();
  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Việc làm:</Title>
      </div>
      <div className="p-typeCoach_typeCoach_header">
        <Button type="primary" onClick={showModal} size="large">
          <PlusOutlined />
          Thêm mới
        </Button>
      </div>
      <div className="p-recruit_table">
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={tableParams.pagination}
          handleTableChange={handleTableChange}
        />
      </div>
      <div className="p-recruit_modal">
        <Modal
          title="Thêm công việc mới"
          visible={values.open}
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
    </div>
  );
}
