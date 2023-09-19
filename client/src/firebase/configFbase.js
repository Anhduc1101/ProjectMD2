
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiEq9-rOID2gU1nXpVNfoZz2wIikosFxI",
  authDomain: "projectmodule02.firebaseapp.com",
  projectId: "projectmodule02",
  storageBucket: "projectmodule02.appspot.com",
  messagingSenderId: "246178114769",
  appId: "1:246178114769:web:a54716279f2d8eb2eda9f0"
};

// Khởi tạo firebase
const app = initializeApp(firebaseConfig);
// Tạo tham chiếu đến dịch vụ lư trữ 
// đc sử dụng để tham chiếu trong toàn bộ ứng dụng
const storage = getStorage(app);

// export ra bên ngoài để sử dụng
export { storage };
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();