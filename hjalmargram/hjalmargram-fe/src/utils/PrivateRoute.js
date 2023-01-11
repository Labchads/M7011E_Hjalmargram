import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
//  let { user } = useContext(AuthContext);
  console.log('private stuff');
  const authenticated = false;
  return (
    <Route {...rest}>{ !authenticated ? <Navigate to="/login" /> : children}</Route>
  )
}

export default PrivateRoute;