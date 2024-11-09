import React from "react";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

import { IController } from "../interfaces/controller";
import { useCanvas } from "../contexts/CanvasContext";

const Controller = (props: IController) => {
  const { options } = props;
  const { selectedId, setSelectedId } = useCanvas();

  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleMenuItemClick = (id: number) => {
    setSelectedId(id);
    setOpen(false);
  };

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);

  const handleClose = () => setOpen(false);

  return (
    <>
      <ButtonGroup ref={anchorRef} variant="contained">
        <Button
          onClick={options?.[selectedId]?.onClick}
          startIcon={options?.[selectedId]?.startIcon}
        >
          {options?.[selectedId]?.children}
        </Button>
        <Button
          size="small"
          onClick={handleToggle}
          children={<ArrowDropDown />}
        />
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options?.map((option, index) => (
                    <MenuItem
                      key={option.id}
                      selected={index === selectedId}
                      onClick={() => handleMenuItemClick(option.id)}
                      children={option.children}
                    />
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Controller;
