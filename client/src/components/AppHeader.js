import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions/api";

export default function AppHeader() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(
    "🚀 ~ file: AppHeader.js:8 ~ AppHeader ~ isAuthenticated",
    isAuthenticated
  );
  const dispatch = useDispatch();

  const onSignOutNavButtonClicked = () => {
    signOut(dispatch);
  };
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Eqolux</NavbarBrand>

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
        {isAuthenticated && (
          <NavItem
            className="cursor-pointer"
            onClick={onSignOutNavButtonClicked}
          >
            Sign-out
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
}
