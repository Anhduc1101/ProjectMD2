import React from "react";
import { Table } from "antd";

export default function ProductManagement() {
  const columns = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Age",
      width: 100,
      dataIndex: "age",
      key: "age",
      fixed: "left",
    },
    {
      title: "Column 1",
      dataIndex: "address",
      key: "1",
      width: 150,
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
      width: 150,
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
      width: 150,
    },
    {
      title: "Column 4",
      dataIndex: "address",
      key: "4",
      width: 150,
    },
    {
      title: "Column 5",
      dataIndex: "address",
      key: "5",
      width: 150,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        // scroll={{
        //   x: 1000,
        //   y: 300,
        // }}
      />
    </div>
  );
}
