import { useState, useEffect, useCallback } from "react";

import { AiOutlineDown } from "react-icons/ai";
import { IconContext } from "react-icons";

import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import styled from './SelectOptions.module.scss';

const Select = ({ options, selected, setSelected, position = false }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => setIsActive(!isActive);

  const handleClickAway = () => {
    setIsActive(false);
  };

  const closeSelectByEsc = useCallback(
    (e) => {
      if (e.code === "Escape") {
        setIsActive(false);
      }
    },
    [setIsActive]
  );

  useEffect(() => {
    window.addEventListener("keydown", closeSelectByEsc);
    return () => {
      window.removeEventListener("keydown", closeSelectByEsc);
    };
  }, [closeSelectByEsc]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box id="3" className={position ? styled.dropdown__first : styled.dropdown}>
        <div className={styled.dropdown__btn} onClick={handleClick}>
          <p>{selected}</p>
          <IconContext.Provider
            value={{
              className: `${styled.react__icon}`,
              style: {
                width: "20px",
                height: "15px",
                color: "black",
              },
            }}
          >
            <AiOutlineDown />
          </IconContext.Provider>
        </div>
        {isActive && (
          <Box
            className={
              position ? styled.dropdown__contentFirst : styled.dropdown__content
            }
          >
            {options?.map((option) => (
              <div
                key={[option]}
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
                className={styled.dropdown__item}
              >
                {option}
              </div>
            ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default Select;
