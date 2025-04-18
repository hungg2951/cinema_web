import { Fragment, useEffect, Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import "antd/dist/antd.css";
import { ClientTheme, AdminTheme } from "./themes";
import { useAppDispatch, useAppSelector } from "./redux/hook";
const Maintain = lazy(() => import("./components/client/Maintain"));
import { getConfigs } from "./redux/slice/webConfig";

  const Loading = () => {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <h2>Loading.....</h2>
      </div>
    )
  }


function App() {
  const dispatch = useAppDispatch();
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const isMaintain = webConfigs[0]?.isMaintaince;
  useEffect(() => {
    dispatch(getConfigs());
  }, [dispatch]);

  return (
    <>
 
        <BrowserRouter>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout: any = ClientTheme;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Maintain isMaintain={isMaintain}>
                      <Layout>
                        <Page />
                      </Layout>
                    </Maintain>
                  }
                />
              );
            })}
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              let Layout: any = AdminTheme;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    // <PrivateRoute acceptRole={1}>
                    <Layout>
                      <Page />
                    </Layout>
                    // </PrivateRoute>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
