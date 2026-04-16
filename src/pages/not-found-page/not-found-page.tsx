import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import type { AppDispatch } from '../../store';
import { logoutAction } from '../../store/api-actions';
import { selectAuthorizationStatus, selectFavoriteOffersCount, selectUserInfo } from '../../store/selectors';

function NotFoundPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const favoriteOffersCount = useSelector(selectFavoriteOffersCount);
  const userInfo = useSelector(selectUserInfo);

  const handleLogout = useCallback(() => {
    void dispatch(logoutAction());
  }, [dispatch]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{userInfo?.email}</span>
                        <span className="header__favorite-count">{favoriteOffersCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="/" onClick={handleLogout}>
                        <span className="header__signout">Log out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login" style={{ width: '100%', textAlign: 'center' }}>
            <h1 className="login__title" style={{ marginBottom: '16px' }}>404 Not Found</h1>
            <p style={{ margin: '0 0 24px' }}>
              The page you are looking for does not exist.
            </p>
            <Link className="login__submit form__submit button" to="/">
              Go to main page
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
