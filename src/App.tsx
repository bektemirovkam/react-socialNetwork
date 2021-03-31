import React, { useEffect, FC } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { logout, setUser } from "./redux/actions/auth";
import Preloader from "./components/Preloader";
import { AppStateType } from "./redux/reducers";
import WithSuspense from "./hoc/withSuspense";

import { Layout } from "antd";

const { Content } = Layout;

const ProfileContainer = WithSuspense(
  React.lazy(() => import("./components/Profile/ProfileContainer"))
);
const LoginContainer = WithSuspense(
  React.lazy(() => import("./components/Login/LoginContainer"))
);
const FriendsContainer = WithSuspense(
  React.lazy(() => import("./components/Friends/FriendsContainer"))
);
const ChatPage = WithSuspense(
  React.lazy(() => import("./components/Chat/Chat"))
);

// todo изменение количества юзеров в пагинации
// close через 30 сек после отключения интернета

const App: FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const authUser = useSelector((state: AppStateType) => state.auth.authUser);
  const isInit = useSelector((state: AppStateType) => state.init.isInitApp);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
  }, [isAuth]);

  const logouts: () => void = () => {
    dispatch(logout());
  };

  return (
    <>
      {isInit ? (
        <Layout>
          <Header
            isAuth={isAuth}
            logout={logouts}
            name={authUser ? authUser.login : ""}
          />
          <Layout>
            <Sidebar isAuth={isAuth} logout={logouts} />
            <Layout style={{ padding: "0 24px 24px", minHeight: "100%" }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Switch>
                  <Route
                    path="/profile/:id?"
                    render={() => (
                      <ProfileContainer
                        authUserId={authUser && authUser.id}
                        isAuth={isAuth}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/friends"
                    render={() => <FriendsContainer />}
                  />
                  <Route
                    exact
                    path="/login"
                    render={() => <LoginContainer />}
                  />
                  <Route exact path="/chat" render={() => <ChatPage />} />
                  <Route exact from="/" component={ProfileContainer} />
                  <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default App;
