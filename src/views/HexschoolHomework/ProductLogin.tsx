import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ApiStyles from "../../styles/ProductLogin.module.scss";
import { RootState, AppDispatch } from '../../stores/store';
import { loginUser, checkLoginStatus } from '../../stores/userStore';
import { fetchProducts } from '../../stores/productStore';
import { useNavigate } from "react-router-dom";

const ProductLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState({
    username: "andyhello31468@gmail.com",
    password: "andy0314",
  });
  const navigate = useNavigate();

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
      navigate('/hexSchool_homeWork/ProductList');
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

export default ProductLogin;