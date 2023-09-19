import React, { useEffect, useState } from "react";
import { storage } from "../firebase/configFirebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import ReactPlayer from "react-player";

export default function UploadSingleFile() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  console.log(imageUrls);

  // tao 1 tham chieu den thu muc chua kho anh tren firebase
  const imageListRef = ref(storage, "images/");

  // ham upload được file lên firebase
  const uploadFiles = (files) => {
    // phai xu ly dc tac vu them nhieu file => bat dong bo => phai su dung promise
    Promise.all(
      files.map((file) => {
        // tao mot tham chieu <=> tao folder tren firebase
        const imageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(imageRef, file).then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        });
      })
    ).then((urls) => {
      // tra ve danh sach cac urls
      setImageUrls((prev) => [...prev, urls]);
    });
  };

  const handleSelectFiles = (e) => {
    // lấy tất cả giá trị trong ô input có type "file"
    const files = Array.from(e.target.files);
    // console.log(files);
    setImageUpload(files);
  };

  // ham click vao nut upload thi tien hanh upload anh len firebase
  const handleUpload = () => {
    // console.log(e.target.files[0]);
    if (!imageUpload) {
      return;
    } else {
      uploadFiles(imageUpload);
    }
  };

  // lay url tren firebase
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      // response tra ve la 1 mang danh sach cac url
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          // danh sach url
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <h1>Danh sách hình ảnh</h1>
      <div style={{ display: "flex", gap: 10 }}>
        {imageUrls.map((url) => (
          //   <img src={url} alt="ảnh" key={url} height={200} width={200} />
          <ReactPlayer url={url} controls={true} />
        ))}
      </div>
      <input type="file" onChange={handleSelectFiles} multiple />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}
