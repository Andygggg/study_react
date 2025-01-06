import "./App.css";
import Login from "./views/login/Login";
import HomeWork from "./views/HexschoolHomework/HomeWork";
import Week1List from "./views/HexschoolHomework/Week1List";
import Week2Api from "./views/HexschoolHomework/Week2Api";
import UploadProduct from "./views/HexschoolHomework/UploadProduct";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

interface RouteMeta {
  title: string;
}

interface RouteMenu {
  path: string;
  name: string;
  component: JSX.Element;
  children?: RouteMenu[];
  meta: RouteMeta;
}

const router: RouteMenu[] = [
  {
    path: "/",
    name: "userLogin",
    component: <Login />,
    meta: {
      title: "登入頁面",
    },
  },
  {
    path: "/hexSchool_homeWork",
    name: "homeWork",
    component: <HomeWork />,
    meta: {
      title: "六角作業練習",
    },
    children: [
      {
        path: "week1",
        name: "List",
        component: <Week1List />,
        meta: {
          title: "第一週",
        },
      },
      {
        path: "week2",
        name: "ApiWork",
        component: <Week2Api />,
        meta: {
          title: "第二週",
        },
      },
      {
        path: "upload",
        name: "UploadProduct",
        component: <UploadProduct />,
        meta: {
          title: "產品上傳",
        },
      },
    ],
  },
];

const renderRoutes = (routes: RouteMenu[]) => {
  return routes.map((route) => {
    if (route.children && route.children.length > 0) {
      const defaultChild = route.children[0];
      return (
        <Route key={route.name} path={route.path} element={route.component}>
          {/* 當訪問父路徑時，重定向到第一個子路由 */}
          <Route 
            index 
            element={<Navigate to={`${route.path}/${defaultChild.path}`} replace />} 
          />
          {route.children.map((child) => (
            <Route
              key={child.name}
              path={child.path}
              element={child.component}
            />
          ))}
        </Route>
      );
    }
    return <Route key={route.name} path={route.path} element={route.component} />;
  });
};

const App = () => {
  return (
    <HashRouter>
      <div className="outer_box">
        <Routes>
          {/* 根路徑重定向到登入頁 */}
          {renderRoutes(router)}
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;