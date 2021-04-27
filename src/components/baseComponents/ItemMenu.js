import { Menu, MenuItem } from "@material-ui/core";
import React from "react";

const ItemMenu = ({ anchorEl, handleClose, menuItems }) => {
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {menuItems.map((item) => {
        return (
          <MenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default ItemMenu;
