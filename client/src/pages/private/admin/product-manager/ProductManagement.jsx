import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../../redux/slice/productSlice";
// import "./userManager.css";



export default function ProductManagement() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data)
  const isLoadingChange=useSelector((state)=>state.product.isLoadingChange)




  
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
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
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

  const handleFilter = (filters) => {
    console.log(filters);
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [isLoadingChange]);


  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "5vw",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      width: "15vw",
      ...getColumnSearchProps("product_name"),
      sorter: (a, b) => a.product_name.length - b.product_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "15vw",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      width: "10vw",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "10vw",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10vw",
      filters: [
        {
          text: "1200000",
          value: "1200000",
        },
        {
          text: "15000",
          value: "15000",
        },
      ],
      onFilter: (value, record) => record.price === Number(value),
    },

    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: "5vw",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "10vw",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "5vw",
      render: () => (
        <span>
          <EditOutlined
            style={{ color: "RGB(249, 191, 41)", paddingRight: 10 }}
          />
          <DeleteOutlined style={{ color: "red" }} />
        </span>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={products} onChange={handleFilter} />
    </>
  );
}
