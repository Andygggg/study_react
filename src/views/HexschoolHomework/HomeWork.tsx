import homework_styles from '../../styles/HomeWork.module.scss'

import { Outlet, useNavigate } from "react-router-dom";

const HomeWorkNavbar = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate('/');
  };
  
  return (
    <div className={homework_styles.navbar}>
      <span onClick={back}>React每周練習</span>
      <span>第一週</span>
      <span>第二週</span>
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