import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const withRedirect = (Component) => (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Redirect to="/login" />;
  }
  return <Component {...props} />;
};

export default withRedirect;
