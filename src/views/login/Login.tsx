import { useState } from 'react';
import { useRouter } from "@/router/useRouterManger";
import styles from '../../styles/Login.module.scss';

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: 'xxxxxxxx@gmail.com',
    password: '00000000',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.login_box}>
      <div className={styles.wrapper}>
        <h1>Sign In</h1>
        
        <div className={styles.wrapper_body}>
          <span>Account</span>
          <div className={styles.input_box}>
            <input
              type="text"
              placeholder="UserName"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
            />
           <i className="bx bxs-user"></i>
          </div>

          <span>Password</span>
          <div className={styles.input_box}>
            <input
              type="password"
              placeholder="PassWord"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button 
            type="submit" 
            className={styles.btn_login}
            onClick={()=> router.push('/hexSchool_homeWork_forestage')}
          >
            Login
          </button>
        </div>

        <div className={styles.wrapper_footer}>
          <hr className={styles.hr_content} data-content="or" />
          <div className={styles.icon_item}>
          <span><i className="bx bxl-google bx-lg bx-tada-hover"></i></span>
          <span><i className="bx bxl-github bx-lg bx-tada-hover"></i></span>
          <span><i className="bx bxl-twitter bx-lg bx-tada-hover"></i></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;