import { useNavigate, useLocation, useParams, Route, Navigate } from 'react-router-dom';

import Login from "@/views/login/Login";
import ForeStage from "@/views/HexschoolHomework/ForeStage";
import BackStage from '@/views/HexschoolHomework/BackStage';
import ProductList from "@/views/HexschoolHomework/ProductList";
import ProductLogin from "@/views/HexschoolHomework/ProductLogin";
import ProductForm from "@/views/HexschoolHomework/ProductForm";
import ShoppingCart from "@/views/HexschoolHomework/ShoppingCart";
import FrontPage from '@/views/HexschoolHomework/FrontPage';
import ShoppingList from '@/views/HexschoolHomework/ShoppingList';

interface RouteMeta {
  title: string;
  isNavbar?: boolean;
}

export interface RouteMenu {
  path: string;
  name: string;
  component: JSX.Element;
  children?: RouteMenu[];
  meta: RouteMeta;
}

export const routes: RouteMenu[] = [
  {
    path: "/",
    name: "userLogin",
    component: <Login />,
    meta: {
      title: "登入頁面",
    },
  },
  {
    path: "/hexSchool_homeWork_forestage",
    name: "homeWork_forestage",
    component: <ForeStage />,
    meta: {
      title: "六角作業練習(前台)",
    },
    children: [
      {
        path: "FrontPage",
        name: "FrontPage",
        component: <FrontPage />,
        meta: {
          title: "首頁",
          isNavbar: true,
        },
      },
      {
        path: "ShoppingList",
        name: "ShoppingList",
        component: <ShoppingList />,
        meta: {
          title: "產品列表",
          isNavbar: true,
        },
      },
      {
        path: "ShoppingCart",
        name: "ShoppingCart",
        component: <ShoppingCart />,
        meta: {
          title: "購物車",
          isNavbar: true,
        },
      },
      {
        path: "ProductLogin",
        name: "ProductLogin",
        component: <ProductLogin />,
        meta: {
          title: "登入",
          isNavbar: true,
        },
      },
    ],
  },
  {
    path: "/hexSchool_homeWork_backstage",
    name: "homeWork_backstage",
    component: <BackStage />,
    meta: {
      title: "六角作業練習(後台)",
    },
    children: [
      {
        path: "ProductList",
        name: "List",
        component: <ProductList />,
        meta: {
          title: "後台產品列表",
          isNavbar: true,
        },
      },
      {
        path: "ProductForm/:id",
        name: "ProductForm",
        component: <ProductForm />,
        meta: {
          title: "產品細節",
          isNavbar: false,
        },
      },
    ]
  },
];

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const push = (path: string) => {
    navigate(path);
  };

  // 獲取當前完整路徑的路由資訊
  const getCurrentRoute = () => {
    const currentPath = location.pathname;
    const findRoute = (routes: RouteMenu[], path: string): RouteMenu | undefined => {
      for (const route of routes) {
        if (route.path === path) return route;
        if (route.children) {
          const childPath = path.replace(`${route.path}/`, '');
          const childRoute = findRoute(route.children, childPath);
          if (childRoute) return childRoute;
        }
      }
      return undefined;
    };

    return findRoute(routes, currentPath);
  };

  // 獲取當前路由的父層路由
  const getCurrentParentRoute = () => {
    const currentPath = location.pathname;
    const findParentRoute = (routes: RouteMenu[]): RouteMenu | undefined => {
      for (const route of routes) {
        if (route.children) {
          // 檢查當前路徑是否以父路由路徑開頭
          if (currentPath.startsWith(route.path)) {
            return route;
          }
        }
      }
      return undefined;
    };

    return findParentRoute(routes);
  };

  return {
    push,
    getCurrentRoute,
    getCurrentParentRoute,
    getRouteParams: () => params,
    routeData: routes,
    currentPath: location.pathname,
  };
};

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children && route.children.length > 0) {
      const defaultChild = route.children[0];
      return (
        <Route key={route.name} path={route.path} element={route.component}>
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