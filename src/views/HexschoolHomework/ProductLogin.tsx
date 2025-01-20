import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginStyle from "../../styles/ProductLogin.module.scss";
import { RootState, AppDispatch } from "../../stores/store";
import { loginUser, checkLoginStatus, logout } from "../../stores/userStore";
import { getProducts } from "../../stores/productStore";
import { useNavigate } from "react-router-dom";

// andyhello31468@gmail.com
// andy0314
const ProductLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (name: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const data = await dispatch(loginUser(user)).unwrap();
      if (data.success) {
        await dispatch(getProducts(1));
        alert(data.message)
        navigate("/hexSchool_homeWork/ProductList");
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("登入失敗:")
      console.error("登入失敗:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCheckStatus = () => {
    dispatch(checkLoginStatus())
      .unwrap()
      .then((success) => {
        alert(success ? "已登入" : "未登入");
      })
      .catch((error) => {
        console.error("檢查狀態失敗:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? (
    <>
      <div className={loginStyle.login_box}>
        <button className="btn btn-primary" onClick={handleCheckStatus}>
          檢查是否登入
        </button>

        <button className="btn btn-primary" onClick={handleLogout}>
          登出
        </button>
      </div>
    </>
  ) : (
    <div className={loginStyle.login_box}>
      <div className={loginStyle.input_row}>
        <span>帳號：</span>
        <input
          type="email"
          className="form-control"
          value={user.username}
          onChange={(e) => handleInput("username", e.target.value)}
        />
      </div>
      <div className={loginStyle.input_row}>
        <span>密碼：</span>
        <input
          type="password"
          className="form-control"
          value={user.password}
          onChange={(e) => handleInput("password", e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        登入
      </button>
    </div>
  );
};

export default ProductLogin;
