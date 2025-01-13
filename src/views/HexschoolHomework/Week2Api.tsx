import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Week1List from "./Week1List";
import ApiStyles from "../../styles/Week2Api.module.scss";
import { RootState, AppDispatch } from '../../stores/store';
import { loginUser, checkLoginStatus } from '../../stores/userStore';
import { fetchProducts } from '../../stores/productStore';

const Week2Api = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.products);
  const [user, setUser] = useState({
    username: "andyhello31468@gmail.com",
    password: "andy0314",
  });

  useEffect(() => {
    sessionStorage.removeItem('access_token');
  }, []);

  const handleInput = (name: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      await dispatch(loginUser(user)).unwrap();
      await dispatch(fetchProducts());
    } catch (error) {
      console.error('登入失敗:', error);
    }
  };

  const handleCheckStatus = () => {
    dispatch(checkLoginStatus())
      .unwrap()
      .then((success) => {
        alert(success ? '已登入' : '未登入');
      })
      .catch((error) => {
        console.error('檢查狀態失敗:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? (
    <>
      <div className={ApiStyles.login_box}>
        <button 
          className="btn btn-primary" 
          onClick={handleCheckStatus}
        >
          檢查是否登入
        </button>
      </div>
      <Week1List products_data={products} />
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
          type="password"
          className="form-control"
          value={user.password}
          onChange={(e) => handleInput("password", e.target.value)}
        />
      </div>
      <button 
        className="btn btn-primary" 
        onClick={handleLogin}
      >
        登入
      </button>
    </div>
  );
};

export default Week2Api;