import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import type { RootState } from '../../store';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
