import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  InputNumber,
  Pagination,
  Image,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../../../redux/slice/categorySlice";
import { storage } from "../../../../firebase/configFbase";

export default function CategoryManagement() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const isLoadingChange = useSelector(
    (state) => state.category.isLoadingChange
  );
  // console.log(categories);

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleShowModalDelete = (id) => {
    // console.log(handleShowModalDelete);
    setIdDelete(id);
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = () => {
    dispatch(deleteCategory(idDelete));
    setIdDelete();
    setIsModalOpenDelete(false);
  };
  const handleCancelDelete = () => {
    setIdDelete();
    setIsModalOpenDelete(false);
  };

  // add + update =====================================================================================
  const [formRef] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categoryUpdate, setCatagoryUpdate] = useState({});

  // ========================================================
  const [imageUpload, setImageUpload] = useState(null);
  const [linkImage, setLinkImage] = useState("");

  const handleChoosePhoto = (e) => {
    if (!e.target.files) {
      return;
    }
    setImageUpload(e.target.files[0]);
    setLinkImage(URL.createObjectURL(e.target.files[0]));
  };
  // ========================================================

  const handleShowModal = (cate) => {
    setCatagoryUpdate(cate);
    if (cate && cate.image) {
      setLinkImage(cate.image);
    }
    formRef.setFieldsValue(cate);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setCatagoryUpdate();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    formRef.resetFields();
    setCatagoryUpdate();
    setImageUpload();
    setLinkImage();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (linkImage == "") {
      message.info("Choose Photo!");
      return;
    }

    // update ===========================================
    if (categoryUpdate && categoryUpdate.id) {
      if (categoryUpdate.image.includes("https")) {
        dispatch(
          updateCategory({
            ...values,
            image: linkImage,
            id: categoryUpdate.id,
          })
        );
        formRef.resetFields();
        handleCancel();
      } else {
        const imageRef = ref(storage, `image/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              return {
                ...values,
                image: url,
                id: categoryUpdate.id,
              };
            })
            .then((data) => {
              dispatch(updateCategory(data));
              handleCancel();
            })
            .catch((error) => {
              message.info(error);
            });
        });
      }
      return;
    }
    // ============================================================================

    // add ==============================================
    const imageRef = ref(storage, `image/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          return {
            ...values,
            image: url,
          };
        })
        .then((data) => {
          dispatch(addCategory(data));
          handleCancel();
        })
        .catch((error) => {
          message.info(error);
        });
    });
    // =======================================================================================================
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // =================

  useEffect(() => {
    dispatch(getCategory());
  }, [isLoadingChange]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "image",
      key: "image",
      render: (link) => <Image width={50} src={link} alt="image" />,
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "Action",
      key: "action",
      render: (cat) => (
        <Space size="middle" key={cat.id}>
          <Button onClick={() => handleShowModal(cat)}>Edit </Button>
          <Button onClick={() => handleShowModalDelete(cat.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Delete Category"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure delete?</p>
      </Modal>

      <Modal
        title={categoryUpdate ? "Update" : "Add"}
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form
          name="basic"
          form={formRef}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px 0 20px 0",
            }}
          >
            <div style={{ margin: "10px 0" }}>
              <label
                htmlFor="image_file"
                style={{
                  padding: "5px 10px",
                  borderRadius: 5,
                  backgroundColor: "blue",
                }}
              >
                Choose File
              </label>
              <input
                id="image_file"
                style={{ display: "none" }}
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={(e) => handleChoosePhoto(e)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Image width={200} src={linkImage} />
            </div>
          </div>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={() => handleShowModal()}>Add</Button>
      <div>
        <Table
          columns={columns}
          dataSource={categories}
          pagination={{ pageSize: 3 }}
        />
      </div>
    </>
  );
}
