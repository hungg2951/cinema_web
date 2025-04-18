import React, { lazy, useTransition, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
import App from "./App"
const Loading = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <h2>Loading.....</h2>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<Loading />}>
         <App /> 
         </Suspense>
    </PersistGate>

  </Provider>

);