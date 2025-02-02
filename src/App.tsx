import "./App.css";
import Login from "./views/login/Login";
import HomeWork from "./views/HexschoolHomework/HomeWork";
import ProductList from "./views/HexschoolHomework/ProductList";
import ProductLogin from "./views/HexschoolHomework/ProductLogin";
import ProductForm from "./views/HexschoolHomework/ProductForm";
import ShoppingCart from "./views/HexschoolHomework/ShoppingCart";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";

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
        path: "ProductLogin",
        name: "ProductLogin",
        component: <ProductLogin />,
        meta: {
          title: "登入",
        },
      },
      {
        path: "ProductList",
        name: "List",
        component: <ProductList />,
        meta: {
          title: "產品列表",
        },
      },
      {
        path: "ProductForm/:id",
        name: "ProductForm",
        component: <ProductForm />,
        meta: {
          title: "產品細節",
        },
      },
      {
        path: "ShoppingCart",
        name: "ShoppingCart",
        component: <ShoppingCart />,
        meta: {
          title: "購物車",
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
            element={
              <Navigate to={`${route.path}/${defaultChild.path}`} replace />
            }
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
    return (
      <Route key={route.name} path={route.path} element={route.component} />
    );
  });
};

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="outer_box">
          <Routes>
            {/* 根路徑重定向到登入頁 */}
            {renderRoutes(router)}
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
};

export default App;
