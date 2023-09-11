import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../api/getUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import Sidebar from "../pages/SideBar";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "../pages/TopBar";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    const initLogin = async () => {
      const user = await getUserInfo();
      dispatch(setUser(user));
      setIsLoading(false);
    };
    initLogin();
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (user)
    return (
      <>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div
              className="flex-container"
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Sidebar isSidebar={isSidebar} />
              <main
                className="content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "90%",
                }}
              >
                <TopBar setIsSidebar={setIsSidebar} />
                <Outlet />
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </>
    );
  else return <Navigate to="/" />;
};

export default AuthLayout;
