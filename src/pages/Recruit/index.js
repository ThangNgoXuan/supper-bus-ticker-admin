import { Button, DatePicker, Input, Modal, Table, Typography } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { dateFormat } from "../../utils";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Recruit() {
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
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];

  const listData = new Array(30).fill({
    key: 1,
    name: `Frontent`,
    salary: `15.000.000`,
    dule: "30/09/2022",
    total: 30,
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  });

  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // HandleDelete
  const handleDelete = () => {};

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
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Tạo"
          cancelText="Hủy"
        >
          <div className="p-recruit_modal_field">
            <div className="p-recruit_modal_field-input">
              <Title level={5}>Tên việc làm</Title>
              <Input placeholder="Nhập tên việc làm (*)" />
            </div>
            <div className="p-recruit_modal_field-input">
              <Title level={5}>Lương</Title>
              <Input placeholder="Nhập lương (*)" />
            </div>
          </div>
          <div className="p-recruit_modal_field">
            <div className="p-recruit_modal_field-input">
              <Title level={5}>Ngày hết hạn</Title>
              <DatePicker
                defaultValue={moment("09/09/2022", dateFormat)}
                format={dateFormat}
              />
            </div>
          </div>
          <div className="p-recruit_modal_field">
            <div className="p-recruit_modal_field-textarea">
              <Title level={5}>Mô tả công việc</Title>
              <CKEditor editor={ClassicEditor} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
