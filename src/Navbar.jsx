import React from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import colors from "./colors";

const Container = styled("header")`
  background-color: ${colors.dark};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }

  span {
    color: ${colors.primary};
  }
`;

const NavBar = () => (
  <Container>
    <NavLink to="/">Adopt Me</NavLink>
    <NavLink to="/search-params">
      <span aria-label="search">Search</span>
    </NavLink>
  </Container>
);

export default NavBar;
