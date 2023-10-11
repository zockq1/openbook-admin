import BaseLayout from "../commons/BaseLayout";
import SideMenu from "../units/ui/SideMenu";
import Header from "../units/ui/Header";
import Login from "../units/auth/Login";

function LoginPage() {
  return (
    <BaseLayout>
      <SideMenu />
      <Header />
      <Login />
    </BaseLayout>
  );
}

export default LoginPage;
