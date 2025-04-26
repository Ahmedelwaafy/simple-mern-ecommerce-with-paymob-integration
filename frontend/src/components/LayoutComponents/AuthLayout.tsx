import { Outlet } from "react-router-dom";
import { Container } from "../MainComponents";

function AuthLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default AuthLayout;
