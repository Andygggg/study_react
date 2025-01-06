import { useEffect, useState } from "react";
import Week1List from "./Week1List";
import ApiStyles from "../../styles/Week2Api.module.scss";
import axios from "axios";

interface Product {
  category: string;
  content: string;
  description: string;
  id: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  num: number;
  imageUrl: string;
  imagesUrl: string[];
}

const api = "https://ec-course-api.hexschool.io/v2";
const path = "andy_react";

// andyhello31468@gmail.com andy0314
const Week2Api = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isActive, setActive] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    sessionStorage.removeItem('access_token')
  }, [])

  const handleInput = (name: string, value: string | boolean) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userLogin = async () => {
    try {
      const res = await axios.post(`${api}/admin/signin`, user);
      const {token} = res.data
      sessionStorage.setItem('access_token', token)

      axios.defaults.headers.common.Authorization = `${token}`;
      await getProduct();
      setActive(true);
    } catch (error) {
      console.log(error);
    }
  };

  const checkStatus = async () => {
    try {
      const token =sessionStorage.getItem('access_token')
      axios.defaults.headers.common.Authorization = `${token}`;
      const res = await axios.post(`${api}/api/user/check`);

      if (res.data.success) {
        alert('已登入')
      } else {
        alert('未登入')
        setActive(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`${api}/api/${path}/admin/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return isActive ? (
    <>
      <div className={ApiStyles.login_box}>
        <button className="btn btn-primary" onClick={checkStatus}>檢查是否登入</button>
      </div>
      <Week1List products_data ={products} />
    </>
  ) : (
    <div className={ApiStyles.login_box}>
      <div className={ApiStyles.input_row}>
        <span>帳號：</span>
        <input
          type="email"
          className="form-control"
          value={user.username}
          onChange={(e) => handleInput("username", e.target.value)}
        />
      </div>
      <div className={ApiStyles.input_row}>
        <span>密碼：</span>
        <input
          type="email"
          className="form-control"
          value={user.password}
          onChange={(e) => handleInput("password", e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={userLogin}>
        登入
      </button>
    </div>
  );
};

export default Week2Api;
