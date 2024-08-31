import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}>
      <nav style={{ display: "flex", gap: "2rem" }}>
        <Link to="/">Main Page</Link>
        <Link to="/create-product">Create New Product</Link>
      </nav>
    </header>
  );
}

export default Header;
