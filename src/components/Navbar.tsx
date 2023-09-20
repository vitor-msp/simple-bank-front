import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { NavLink } from "react-router-dom";
import { Logout } from "./Logout";

export const Navbar = () => {
  const accountContext = useContext(AccountContext);

  return (
    <>
      {accountContext.isLoggedIn ? (
        <nav>
          <NavLink to={"/home"}>____home____</NavLink>
          <NavLink to={"/my-account"}>____my account____</NavLink>
          <Logout />
        </nav>
      ) : (
        <nav>
          <NavLink to={"/login"}>____login____</NavLink>
          <NavLink to={"/sign-up"}>____sign up____</NavLink>
        </nav>
      )}
    </>
  );
};
