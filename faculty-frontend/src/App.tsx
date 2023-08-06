import React, { useEffect, useState } from "react";
import { CustomContext } from "./utils/Context";
import Loader from "./components/Loader";
import { Auth, UnAuth } from "./utils/Routes";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import axiosObj from "./api";
import ENDPOINTS from "./api/endpoints";
import token from "./api/token";

const endpoint = ENDPOINTS.JWT_VERIFY;

function App() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [auth, setAuth] = useState<Boolean>(false);

  const value = {
    data,
    setData,
    setAuth,
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await axiosObj.get(endpoint);

        if (resp.status === 200) {
          setData(resp.data.data);
          setAuth(true);
        } else {
          const t = token.getService();
          t.clearToken();
        }
        setLoading(false);
      } catch (err: any) {}
    })();
  }, []);

  return (
    <CustomContext.Provider value={value}>
      <div className="App">
        {loading ? (
          <span className="main-loader">
            {" "}
            <Loader />{" "}
          </span>
        ) : (
          <div>{auth ? <Auth /> : <UnAuth />}</div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </CustomContext.Provider>
  );
}

export default App;
