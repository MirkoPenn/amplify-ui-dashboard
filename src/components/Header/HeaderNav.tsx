import React from "react";
import { Menu, MenuItem, MenuButton, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const HeaderNav = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
      <Menu
        menuAlign="end"
        trigger={
          <MenuButton variation="menu">
            <div>
              <span>{user ? user.username : "-"}</span>
            </div>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => navigate("/profile")}>Profilo</MenuItem>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </Menu>
  );
};

export default HeaderNav;
