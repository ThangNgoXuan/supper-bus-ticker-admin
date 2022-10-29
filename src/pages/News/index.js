import React, { useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  notification,
  Table,
  Typography,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useFetch from "../../hooks/useFetch";
import useValues from "../../hooks/useValues";
import newsApi from "../../api/newApi";
import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";

export default function News() {
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

  const { Title } = Typography;
  const [form] = Form.useForm();

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
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (index) => {
        return (
          <Image
            src={index || "https://picsum.photos/50"}
            style={{ height: "50px" }}
          />
        );
      },
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

  // HandleDelete
  const handleDelete = (record) => {
    console.log(record)
    newsApi
      .deleteNew(record._id)
      .then((res) => {
        refetch();
        notification.open({
          message: "Xóa thành công",
        });
      })
      .catch((err) => {
        notification.open({
          message: "Xóa thất bại",
        });
      });
  };

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

  // Pagination Table
  const [tableParams, setTableParams] = useState({
    pagination: {
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

  const handleClose = () => {
    setValues({
      open: false,
      idUpdate: "",
    });
    form.resetFields();
  };

  const submitNew = (data) => {
    console.log(data);
    if (values.idUpdate) {
      newsApi
        .updateNew(data, values.idUpdate)
        .then((res) => {
          refetch();
          notification.open({
            message: "Cập nhật thành công",
          });
        })
        .catch((err) => {
          console.log(data);
          console.log('qq',values.idUpdate);

          notification.open({
            message: "Cập nhật thất bại",
          });
        });
    } else {
      newsApi
        .addNew(data)
        .then((res) => {
          refetch();
          notification.open({
            message: "Thêm thành công",
          });
        })
        .catch((err) => {
          notification.open({
            message: "Thêm thất bại",
          });
        });
    }
    handleClose();
  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Tin tức:</Title>
      </div>
      <div className="p-typeCoach_typeCoach_header">
        <Button type="primary" onClick={showModal} size="large">
          <PlusOutlined />
          Tạo mới
        </Button>
      </div>
      <div className="p-news_table">
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={tableParams.pagination}
          handleTableChange={handleTableChange}
        />
      </div>
      <div className="p-news_modal">
        <Modal
          title={values.idUpdate ? "Cập nhật tin tức" : "Thêm tin tức mới"}
          visible={values.open}
          onCancel={handleClose}
          maskClosable={false}
          footer={[
            <>
              <Button
                onClick={handleClose}
                style={{ backgroundColor: "#001c6b", color: "white" }}
              >
                Hủy
              </Button>
              <Button
                htmlType="submit"
                form="formNew"
                style={{ backgroundColor: "#001c6b", color: "white" }}
              >
                {values.idUpdate ? "Cập nhật" : "Tạo"}
              </Button>
            </>,
          ]}
        >
          <Form onFinish={submitNew} form={form} id="formNew" layout="vertical">
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề",
                },
              ]}
            >
              <Input placeholder="Nhập tiêu đề" />
            </Form.Item>
            <Form.Item
              name="subtitle"
              label="Tiêu đề"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề nhỏ",
                },
              ]}
            >
              <Input placeholder="Nhập tiêu đề nhỏ" />
            </Form.Item>
            <Form.Item
              name="thumbnail"
              label="Thumbnail"
              rules={[
                {
                  required: true,
                  message: "Vui lòng thêm thumbnail",
                },
              ]}
            >
              <Input placeholder="Thêm thumbnail" />
            </Form.Item>
            <Form.Item
              name="slug"
              label="Slug"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập slug",
                },
              ]}
            >
              <Input placeholder="Nhập slug" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ",
                },
              ]}
            >
              <Input placeholder="Nhập " />
            </Form.Item>
            <Form.Item
              name="order"
              label="Order"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ",
                },
              ]}
            >
              <Input placeholder="Nhập " />
            </Form.Item>
            <Form.Item
              name="content"
              label="Nội dung"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề nhr",
                },
              ]}
              valuePropName="data"
              initialValue={form.content}
              getValueFromEvent={(even, editor) => {
                const data = editor.getData();
                return data;
              }}
            >
              <CKEditor editor={ClassicEditor} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
