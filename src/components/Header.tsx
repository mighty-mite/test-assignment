import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav>
        <Link className="header__logo-link" to="/">
          main page
        </Link>
        <div className="header__buttons">
          <Link className="header__cart" to="/create-product">
            create new product
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
