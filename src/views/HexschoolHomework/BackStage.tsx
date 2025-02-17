import homework_styles from "../../styles/HomeWork.module.scss";

import { Outlet } from "react-router-dom";
import { useRouter } from "@/router/useRouterManger";
import { logout } from "@/stores/userStore";
import { openMessage } from "@/stores/messageStore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../stores/store";

const HomeWorkNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const parentRoute = router.getCurrentParentRoute();

  const userLogout = () => {
    dispatch(logout());
    router.push('/hexSchool_homeWork_forestage')
    dispatch(openMessage({
      success: true,
      message: "已登出"
    }));
  }

  return (
    <div className={homework_styles.navbar}>
      <span onClick={() => router.push('/')}>React每周練習</span>
      {parentRoute?.children ? parentRoute?.children.map((route) => {
        if (route.meta.isNavbar) {
          return <span key={route.name} onClick={() => router.push(route.path)}>{route.meta.title}</span> 
        }
      }) : ''}
      <span onClick={userLogout}>登出</span>
    </div>
  );
};

const BackStage = () => {
  return (
    <div className={homework_styles.homework_box}>
      <HomeWorkNavbar />
      <div className={homework_styles.homework_body}>
        <Outlet />
      </div>
    </div>
  );
};

export default BackStage;
