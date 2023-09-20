import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import "./userManager.css";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUser, getUser } from "../../../../redux/slice/userSlice";

export default function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const isLoading = useSelector((state) => state.user.isLoadingChange);

  // console.log(users);

  useEffect(() => {
    dispatch(getUser());
  }, [isLoading]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "5vw",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      width: "15vw",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15vw",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "15vw",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "5vw",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: "10vw",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "10vw",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "5vw",
      render: (role) => <span>{role == 0 ? "admin" : "user"}</span>,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: "5vw",
      render: (active) => <span>{active ? "active" : "block"}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "5vw",
      render: (_, user) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {user.role != 0 ? (
            <Button danger onClick={() => dispatch(changeActiveUser(user))}>
              {user.active ? "Lock" : "Unlock"}
            </Button>
          ) : (
            <></>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={users} />
    </>
  );
}
