import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { NavLink } from "react-router-dom";
import { Logout } from "./Logout";

export const Navbar = () => {
  const accountContext = useContext(AccountContext);

  return (
    <>
      {accountContext.isLoggedIn ? (
        <nav className="flex justify-evenly items-center w-full text-gray-100 font-bold bg-orange-500">
          <NavLink
            to={"/home"}
            className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
          >
            home
          </NavLink>
          <NavLink
            to={"/my-account"}
            className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
          >
            my account
          </NavLink>
          <Logout />
        </nav>
      ) : (
        <nav className="flex justify-evenly items-center w-full text-gray-100 font-bold bg-orange-500">
          <NavLink
            to={"/login"}
            className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
          >
            login
          </NavLink>
          <NavLink
            to={"/sign-up"}
            className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
          >
            sign up
          </NavLink>
        </nav>
      )}
    </>
  );
};
