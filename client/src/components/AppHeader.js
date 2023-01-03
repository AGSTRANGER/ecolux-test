import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AppHeader() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(
    "🚀 ~ file: AppHeader.js:7 ~ AppHeader ~ isAuthenticated",
    isAuthenticated
  );

  return (
    <Navbar color="light" light expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/">
            Home
          </NavLink>
        </NavItem>
        {isAuthenticated && (
          <NavItem>
            <NavLink tag={Link} to="/products">
              Products
            </NavLink>
          </NavItem>
        )}
        {isAuthenticated && (
          <NavItem>
            <NavLink tag={Link} to="/orders">
              Orders
            </NavLink>
          </NavItem>
        )}
      </Nav>
      <Nav className="ml-auto" navbar>
        {!isAuthenticated && (
          <NavItem>
            <NavLink tag={Link} to="/signup">
              Sign Up
            </NavLink>
          </NavItem>
        )}
        {!isAuthenticated && (
          <NavItem>
            <NavLink tag={Link} to="/signin">
              Sign In
            </NavLink>
          </NavItem>
        )}
        {isAuthenticated && <NavItem>Sign-out</NavItem>}
      </Nav>
    </Navbar>
  );
}
