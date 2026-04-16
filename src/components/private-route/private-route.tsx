import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
