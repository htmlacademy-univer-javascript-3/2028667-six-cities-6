import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
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
