import homework_styles from "../../styles/HomeWork.module.scss";

import { Outlet } from "react-router-dom";
import { useRouter } from "@/router/useRouterManger";

const HomeWorkNavbar = () => {
  const router = useRouter();
  const parentRoute = router.getCurrentParentRoute();

  return (
    <div className={homework_styles.navbar}>
      <span onClick={() => router.push('/')}>React每周練習</span>
      {parentRoute?.children ? parentRoute?.children.map((route) => {
        if (route.meta.isNavbar) {
          return <span key={route.name} onClick={() => router.push(route.path)}>{route.meta.title}</span> 
        }
      }) : ''}
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
