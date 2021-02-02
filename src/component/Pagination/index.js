import React from "react";
import ButtonCard from "./ButtonCard";
import "./Pagination.css";

function Pagination({ initialPage, setPage, totalPage }) {
  const onClickHandle = (event, i) => {
    setPage(i);
  };

  const onClickForward = () => {
    setPage(initialPage + 1);
  };
  const onClickBackward = () => {
    setPage(initialPage - 1);
  };

  const createPagination = () => {
    let currentIndex = parseInt(initialPage) + 1;
    let lastIndex = parseInt(totalPage);
    let buttons = [];
    if (currentIndex !== 1) {
      buttons.push({
        value: "<<",
        isActive: false,
        isDisabled: false,
        onClick: onClickBackward,
      });
    }

    const low = currentIndex - 4 > 0 ? 4 : currentIndex - 1;
    const high = currentIndex + 4 <= lastIndex ? 4 : lastIndex - currentIndex;
    if (currentIndex - low >= 2) {
      buttons.push({
        value: 1,
        isActive: false,
        isDisabled: false,
        onClick: onClickHandle,
      });
      if (currentIndex - low > 2) {
        buttons.push({
          value: "...",
          isActive: false,
          isDisabled: true,
        });
      }
    }
    for (var i = low; i > 0; i--) {
      buttons.push({
        value: currentIndex - i,
        isActive: false,
        isDisabled: false,
        onClick: onClickHandle,
      });
    }
    buttons.push({
      value: currentIndex,
      isActive: true,
      isDisabled: false,
      onClick: onClickHandle,
    });
    for (i = 0; i < high; i++) {
      buttons.push({
        value: currentIndex + i + 1,
        isActive: false,
        isDisabled: false,
        onClick: onClickHandle,
      });
    }
    if (lastIndex - currentIndex >= 5) {
      if (lastIndex - currentIndex > 5) {
        buttons.push({
          value: "...",
          isActive: false,
          isDisabled: true,
        });
      }

      buttons.push({
        value: lastIndex,
        isActive: false,
        isDisabled: false,
        onClick: onClickHandle,
      });
    }
    if (lastIndex !== currentIndex) {
      buttons.push({
        value: ">>",
        isActive: false,
        isDisabled: false,
        onClick: onClickForward,
      });
    }
    return buttons;
  };

  const PagiN = ({ buttons }) => {
    {
      console.log(buttons);
    }
    const pageComponent = buttons.map((button, i) => (
      <ButtonCard
        key={i}
        value={button.value}
        isActive={button.isActive}
        isDisabled={button.isDisabled}
        onClick={(e) => button.onClick(e, i)}
      />
    ));
    return <ul className="search-pagination">{pageComponent}</ul>;
  };
  return <PagiN buttons={createPagination()} />;
}

export default Pagination;
