import homework_styles from '../../styles/HomeWork.module.scss'

import { Outlet, useNavigate } from "react-router-dom";

const HomeWorkNavbar = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate('/');
  };

  const ToFirst = () => {
    navigate('/hexSchool_homeWork/ProductList');
  }

  const ToSecond = () => {
    navigate('/hexSchool_homeWork/ProductLogin');
  }

  const ToUpload = () => {
    navigate('/hexSchool_homeWork/upload');
  }
  
  return (
    <div className={homework_styles.navbar}>
      <span onClick={back}>React每周練習</span>
      <span onClick={ToSecond}>登入</span>
      <span onClick={ToFirst}>產品列表</span>
      <span onClick={ToUpload}>產品上傳</span>
      <span>第三週</span>
      <span>第四週</span>
    </div>
  )
}

const HomeWork = () => {
  return(
    <div className={homework_styles.homework_box}>
      <HomeWorkNavbar />
      <div className={homework_styles.homework_body}><Outlet /></div>
    </div>
  )
}

export default HomeWork;