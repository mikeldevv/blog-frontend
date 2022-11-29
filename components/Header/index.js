import Link from "next/link";

const Header = (props) => {
  return (
    <div className="container">
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <Link href={`/profile`} className="link-secondary"></Link>
            <Link href={`/`} className="link-secondary">
              Welcome Guest
            </Link>
          </div>
          <div className="col-4 text-center">
            <Link href={`/`} className="blog-header-logo text-dark">
              BLOG HUB
            </Link>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <a className="link-secondary" href="#" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mx-3"
                role="img"
                viewBox="0 0 24 24"
              >
                <title>Search</title>
                <circle cx="10.5" cy="10.5" r="7.5" />
                <path d="M21 21l-5.2-5.2" />
              </svg>
            </a>

            <>
              <Link
                href={`/signup`}
                className="btn btn-sm btn-outline-secondary user-login-btn"
              >
                Sign up
              </Link>
              <Link
                href={`/login`}
                className="btn btn-sm btn-outline-secondary user-login-btn"
              >
                Sign in
              </Link>
            </>
          </div>
        </div>
      </header>

      <style jsx>
        {`
          .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }

          @media (min-width: 768px) {
            .bd-placeholder-img-lg {
              font-size: 3.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Header;
