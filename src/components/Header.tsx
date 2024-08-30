import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { selectAll } from '../../pages/cartPage/cartSlice';
// import SearchBar from '../searchBar/SearchBar';

function Header() {
  // const quantity = useSelector(selectAll).length;
  return (
    <header className="header">
      <div className="container header__container">
        <Link className="header__logo-link" to="/">
          main page
        </Link>
        {/* <SearchBar /> */}
        <div className="header__buttons">
          <Link className="header__cart" to="/test">
            test page{" "}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
