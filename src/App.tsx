import "./App.css";
import { HashRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { renderRoutes } from '@/router/useRouterManger';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="outer_box">
          <Routes>
            {renderRoutes()}
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
};

export default App;