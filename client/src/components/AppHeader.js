import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <Navbar color="light" light expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/products">
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/orders">
            Orders
          </NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/signup">
            Sign Up
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/signin">
            Sign In
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
