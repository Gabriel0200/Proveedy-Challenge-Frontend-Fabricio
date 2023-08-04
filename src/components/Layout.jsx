import { Outlet } from "react-router-dom";
import { LateralMenu } from "./LateralMenu";
import { Menu } from "./Menu";
import { AppFooter } from "./AppFooter";
// import { AppFooter } from "./AppFooter";
export const Layout = () => {
  return (
    <>
      <LateralMenu />
      <Menu />
      <Outlet />
      <AppFooter />
    </>
  );
};
